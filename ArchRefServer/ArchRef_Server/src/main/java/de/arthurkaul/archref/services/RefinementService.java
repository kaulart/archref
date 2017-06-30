package de.arthurkaul.archref.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.LevelGraphNodeType;
import de.arthurkaul.archref.model.LevelGraphRelationType;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;
import de.arthurkaul.archref.model.topology.TopologyTemplate;
import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.services.levelgraph.LevelGraphNodeService;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;
import de.arthurkaul.archref.services.types.NodeTypeService;
import de.arthurkaul.archref.services.types.RelationshipTypeService;

@Service
public class RefinementService {

	@Autowired
	LevelGraphNodeService levelGraphNodeService;

	@Autowired
	NodeTypeService nodeTypeService;

	@Autowired
	RelationshipTypeService relationshipTypeService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	private float smi = 0.0f;
	private LevelGraph levelGraph;
	private int targetAbstractionLevel;
	private ArrayList<NodeTemplate> queueNodeTemplates;
	private ArrayList<RelationshipTemplate> queueRelationshipTemplates;

	ArrayList<LevelGraphNode> fragmentNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> entryNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> exitNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> includeNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<TopologyTemplate> queueChildTopologyTemplate = new ArrayList<TopologyTemplate>();

	ArrayList<NodeTemplate> exitNodeTemplates = new ArrayList<NodeTemplate>();
	ArrayList<RelationshipTemplate> exitRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	private TopologyTemplate spezificTopologyTemplate;

	private int startAbstractionLevel;

	Long tempIdGenerator = 0l;

	public TopologyTemplate initializeRefinement(LevelGraph levelGraph, TopologyTemplate startTopologyTemplate, int targetAbstractionLevel, float smi) {
		tempIdGenerator = 0l;
		this.targetAbstractionLevel = targetAbstractionLevel;
		this.levelGraph = levelGraph;
		this.smi = smi;

		levelGraph.splitNodes();

		for (NodeTemplate nodeTemplate : startTopologyTemplate.getNodeTemplates()) {
			nodeTemplate.setRefined(false);
		}

		for (RelationshipTemplate relationshipTemplate : startTopologyTemplate.getRelationshipTemplates()) {
			relationshipTemplate.setRefined(false);
		}

		startTopologyTemplate = startRefinement(startTopologyTemplate);

		return startTopologyTemplate;
	}

	public TopologyTemplate startRefinement(TopologyTemplate abstractTopologyTemplate) {

		startAbstractionLevel = abstractTopologyTemplate.getAbstractionLevel();
		queueChildTopologyTemplate = new ArrayList<TopologyTemplate>();

		if (targetAbstractionLevel <= startAbstractionLevel) {
			return abstractTopologyTemplate;
		}

		abstractTopologyTemplate = startRefinementStep(abstractTopologyTemplate);

		for (TopologyTemplate spezificTopologyTemplate : queueChildTopologyTemplate) {

			spezificTopologyTemplate = startRefinement(spezificTopologyTemplate);
		}

		return abstractTopologyTemplate;

	}

	private TopologyTemplate startRefinementStep(TopologyTemplate abstractTopologyTemplate) {

		queueNodeTemplates = new ArrayList<NodeTemplate>(abstractTopologyTemplate.getNodeTemplates());
		queueRelationshipTemplates = new ArrayList<RelationshipTemplate>(abstractTopologyTemplate.getRelationshipTemplates());

		NodeTemplate startNodeTemplate = queueNodeTemplates.iterator().next();

		spezificTopologyTemplate = new TopologyTemplate();
		spezificTopologyTemplate.setName("RefinedTopologyTemplate");
		spezificTopologyTemplate.setAbstractionLevel(abstractTopologyTemplate.getAbstractionLevel() + 1);
		spezificTopologyTemplate.setParentTopologyTemplate(abstractTopologyTemplate);
		spezificTopologyTemplate.setParentTopologyTemplateId(abstractTopologyTemplate.getId());

		refineNodeTemplate(new ArrayList<RelationshipTemplate>(), startNodeTemplate, abstractTopologyTemplate);

		return abstractTopologyTemplate;
	}

	private void refineNodeTemplate(ArrayList<RelationshipTemplate> prevRelationshipTemplates, NodeTemplate abstractNodeTemplate, TopologyTemplate abstractTopologyTemplate) {

		for (LevelGraphNode levelGraphNode : levelGraph.getNodeTypes().get(startAbstractionLevel)) {
			System.out.println(levelGraphNode.getLevelGraphNodeTypeId() + " == " + abstractNodeTemplate.getNodeTypeId());
			if (levelGraphNode.getLevelGraphNodeTypeId() == abstractNodeTemplate.getNodeTypeId()) {
				for (LevelGraphRelation levelGraphRelation : levelGraphNode.getOutRefineRelations()) {

					LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(levelGraphRelation.getTargetNodeId());

					System.out.println(smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractNodeTemplate.getExpectedProperties()));
					if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractNodeTemplate.getExpectedProperties())) {

						ArrayList<LevelGraphNode> preveNodeQueue = new ArrayList<LevelGraphNode>();
						ArrayList<LevelGraphNode> entryNodeQueue = new ArrayList<LevelGraphNode>();

						System.out.println("NodeType: " + refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE));
						System.out.println("NodeTypeFragment: " + refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT));

						if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
							entryNodeQueue.add(refinLevelGraphNode);
						}

						else if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
							for (LevelGraphRelation entryRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
								System.out.println("EntryPoint: " + entryRelation.isEntryPoint());
								if (entryRelation.isEntryPoint()) {
									entryNodeQueue.add(entryRelation.getTargetLevelGraphNode());

								}
							}
						}

						System.out.println("PrevRelationEmpty?: " + !prevRelationshipTemplates.isEmpty());
						if (!prevRelationshipTemplates.isEmpty()) {
							for (RelationshipTemplate prevRelationshipTemplate : prevRelationshipTemplates) {
								preveNodeQueue.add(prevRelationshipTemplate.getLevelGraphNode());
							}
						}

						System.out.println("PrevRelationEmpty?: " + prevRelationshipTemplates.isEmpty());
						System.out.println("Kompatible?: " + isCompatibleToPrevRefinement(preveNodeQueue, entryNodeQueue, false));

						if (prevRelationshipTemplates.isEmpty() || isCompatibleToPrevRefinement(preveNodeQueue, entryNodeQueue, false)) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitNodeTemplates = new ArrayList<NodeTemplate>();

							fragment = createNodeTypeFragment(refinLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplates, abstractTopologyTemplate);
							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());
							abstractNodeTemplate.setRefined(true);

							queueNodeTemplates.remove(abstractNodeTemplate);

							System.out.println("Noch unbesuchte ausgehende Kanten?: " + existNotVisitedOutRelation(abstractNodeTemplate));
							System.out.println("Gibt es noch unbesuchte Knoten: " + !queueNodeTemplates.isEmpty());
							System.out.println("gibt es noch nicht verfeinerte Kanten " + !queueRelationshipTemplates.isEmpty());

							if (existNotVisitedOutRelation(abstractNodeTemplate)) {

								for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
									if (!abstractRelationshipTemplate.isRefined()) {
										refineRelationshipTemplate(exitNodeTemplates, abstractRelationshipTemplate, abstractTopologyTemplate);

									}
								}

							} else if (!queueNodeTemplates.isEmpty()) {

								NodeTemplate nextAbstractNodeTemplate = queueNodeTemplates.iterator().next();
								refineNodeTemplate(new ArrayList<RelationshipTemplate>(), nextAbstractNodeTemplate, abstractTopologyTemplate);

							} else if (!queueRelationshipTemplates.isEmpty()) {

								RelationshipTemplate abstractRelationshipTemplate = queueRelationshipTemplates.iterator().next();
								refineRelationshipTemplate(new ArrayList<NodeTemplate>(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {

								// Clone die Topology
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								topologyTemplateService.update(deepCopy);

								queueChildTopologyTemplate.add(deepCopy);
							}
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getRelationshipTemplates());

							queueNodeTemplates.add(abstractNodeTemplate);
							abstractNodeTemplate.setRefined(false);

						}

					}
				}
			}
		}
		queueNodeTemplates.remove(abstractNodeTemplate);

	}

	private void refineRelationshipTemplate(ArrayList<NodeTemplate> sourceNodeTemplates, RelationshipTemplate abstractRelationshipTemplate, TopologyTemplate abstractTopologyTemplate) {

		for (LevelGraphNode levelGraphNodeRelationshipType : levelGraph.getRelationshipTypes().get(startAbstractionLevel)) {
			if (levelGraphNodeRelationshipType.getLevelGraphNodeTypeId() == abstractRelationshipTemplate.getRelationshipTypeId()) {
				for (LevelGraphRelation refinRelationshipType : levelGraphNodeRelationshipType.getOutRefineRelations()) {

					LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(refinRelationshipType.getTargetNodeId());

					if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractRelationshipTemplate.getExpectedProperties())) {

						ArrayList<LevelGraphNode> sourceNodeQueue = new ArrayList<LevelGraphNode>();
						ArrayList<LevelGraphNode> targetNodeQueue = new ArrayList<LevelGraphNode>();

						if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPE)) {
							targetNodeQueue.add(refinLevelGraphNode);
						} else if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT)) {
							for (LevelGraphRelation entryRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
								if (entryRelation.isEntryPoint()) {
									targetNodeQueue.add(entryRelation.getTargetLevelGraphNode());
								}
							}
						}

						if (!sourceNodeTemplates.isEmpty()) {
							for (NodeTemplate sourceNode : sourceNodeTemplates) {
								sourceNodeQueue.add(sourceNode.getLevelGraphNode());
							}
						}
						System.out.println("Test: " + isCompatibleToPrevRefinement(sourceNodeQueue, targetNodeQueue, abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()));
						if (sourceNodeTemplates.isEmpty() || isCompatibleToPrevRefinement(sourceNodeQueue, targetNodeQueue, abstractRelationshipTemplate.getTargetNodeTemplate().isRefined())) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitRelationshipTemplates = new ArrayList<RelationshipTemplate>();

							fragment = createRelationshipTypeFragment(exitRelationshipTemplates, refinLevelGraphNode, abstractRelationshipTemplate, sourceNodeTemplates, abstractTopologyTemplate);

							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());
							abstractRelationshipTemplate.setRefined(true);

							queueRelationshipTemplates.remove(abstractRelationshipTemplate);

							if (!abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {
								refineNodeTemplate(exitRelationshipTemplates, abstractRelationshipTemplate.getTargetNodeTemplate(), abstractTopologyTemplate);
							} else if (!queueNodeTemplates.isEmpty()) {

								// Jump Call zum nächsten knoten in der liste
								if (!queueNodeTemplates.isEmpty()) {
									NodeTemplate abstractNodeTemplate = queueNodeTemplates.iterator().next();
									refineNodeTemplate(new ArrayList<RelationshipTemplate>(), abstractNodeTemplate, abstractTopologyTemplate);
								}

							} else if (!queueRelationshipTemplates.isEmpty()) {

								// Jump Call zum nächsten kante in der liste
								abstractRelationshipTemplate = queueRelationshipTemplates.iterator().next();
								refineRelationshipTemplate(new ArrayList<NodeTemplate>(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {
								// Alle Knoten und Kanten wurden im Verfeinerungsprozess besucht und es wurde eine Verfeinerung gefunden
								// ansonsten add spezifische Topologie zu verfeinerte und füge den Knoten wieder zur queue hinzu
								// TODO und ist die Liste der Kinder leer dann wurde
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								topologyTemplateService.update(deepCopy);

								queueChildTopologyTemplate.add(deepCopy);

							}
							queueRelationshipTemplates.add(abstractRelationshipTemplate);
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getRelationshipTemplates());
							abstractRelationshipTemplate.setRefined(false);
						}

					}

				}

			}
		}

		queueRelationshipTemplates.remove(abstractRelationshipTemplate);

	}

	private TopologyTemplate createRelationshipTypeFragment(ArrayList<RelationshipTemplate> exitRelationshipTemplates, LevelGraphNode refinLevelGraphNode,
			RelationshipTemplate abstractRelationshipTemplate, ArrayList<NodeTemplate> sourceNodeTemplates, TopologyTemplate abstractTopologyTemplate) {

		TopologyTemplate fragment = new TopologyTemplate();

		System.out.println("NodeType oneone: " + refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE));
		System.out.println("NodetypeFraghment: ");

		if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPE)) {
			createSpezificRelationshipTemplate(fragment, refinLevelGraphNode, sourceNodeTemplates, abstractRelationshipTemplate, abstractTopologyTemplate);
		} else {

			fragmentNodesQueue = new ArrayList<LevelGraphNode>();
			entryNodesQueue = new ArrayList<LevelGraphNode>();
			exitNodesQueue = new ArrayList<LevelGraphNode>();
			includeNodesQueue = new ArrayList<LevelGraphNode>();

			for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
				refineRelation.getTargetLevelGraphNode().setRefined(false);
				fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				if (refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (refineRelation.isEntryPoint() && !refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (!refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else {
					includeNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				}
			}

			while (!fragmentNodesQueue.isEmpty()) {

				LevelGraphNode startNode = fragmentNodesQueue.iterator().next();
				ArrayList<RelationshipTemplate> prev = new ArrayList<RelationshipTemplate>();

				for (LevelGraphNode entryNode : entryNodesQueue) {
					if (entryNode.getId() == startNode.getId()) {

					}
				}
				if (startNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
					startRefineFragmentNodeType(fragment, startNode, null, new ArrayList<RelationshipTemplate>(), prev, abstractTopologyTemplate, refinLevelGraphNode);

				} else {
					startRefineFragmentRelationshipType(fragment, startNode, null, abstractTopologyTemplate, refinLevelGraphNode, sourceNodeTemplates, prev);
				}

			}
		}
		return fragment;

	}

	private TopologyTemplate createNodeTypeFragment(LevelGraphNode refinLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			TopologyTemplate abstractTopologyTemplate) {

		TopologyTemplate fragment = new TopologyTemplate();

		System.out.println("NodeType oneone: " + refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE));
		System.out.println("NodetypeFraghment: ");

		if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
			exitNodeTemplates.add(createNewSpezificNodeTemplate(refinLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplates, abstractTopologyTemplate, fragment));
		} else {

			fragmentNodesQueue = new ArrayList<LevelGraphNode>();
			entryNodesQueue = new ArrayList<LevelGraphNode>();
			exitNodesQueue = new ArrayList<LevelGraphNode>();
			includeNodesQueue = new ArrayList<LevelGraphNode>();

			for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
				refineRelation.getTargetLevelGraphNode().setRefined(false);
				fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				if (refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (refineRelation.isEntryPoint() && !refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (!refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else {
					includeNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				}
			}

			while (!fragmentNodesQueue.isEmpty()) {

				LevelGraphNode startNode = fragmentNodesQueue.iterator().next();
				ArrayList<RelationshipTemplate> prev = new ArrayList<RelationshipTemplate>();

				for (LevelGraphNode entryNode : entryNodesQueue) {
					if (entryNode.getId() == startNode.getId()) {
						prev.addAll(prevRelationshipTemplates);

					}
				}

				startRefineFragmentNodeType(fragment, startNode, abstractNodeTemplate, prevRelationshipTemplates, prev, abstractTopologyTemplate, refinLevelGraphNode);

			}

		}

		return fragment;
	}

	private void startRefineFragmentNodeType(TopologyTemplate fragment, LevelGraphNode startNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			ArrayList<RelationshipTemplate> prev, TopologyTemplate abstractTopologyTemplate, LevelGraphNode refinLevelGraphNode) {

		ArrayList<NodeTemplate> sourceNodeTemplate = new ArrayList<NodeTemplate>();
		sourceNodeTemplate.add(createNewSpezificNodeTemplate(startNode, abstractNodeTemplate, prev, abstractTopologyTemplate, fragment));

		for (LevelGraphNode exitNode : exitNodesQueue) {
			if (exitNode.getId() == startNode.getId()) {
				exitNodeTemplates.add(abstractNodeTemplate);

			}
		}
		startNode.setRefined(true);

		for (LevelGraphRelation connectRelation : startNode.getOutLevelGraphRelations()) {
			for (LevelGraphNode includeNode : includeNodesQueue) {
				System.out.println(connectRelation.getTargetLevelGraphNode().getId() + " == " + includeNode.getId());
				if (connectRelation.getTargetLevelGraphNode().getId() == includeNode.getId()) {
					System.out.println(!includeNode.isRefined());

					if (!includeNode.isRefined()) {

						LevelGraphNode nextNode = connectRelation.getTargetLevelGraphNode();
						startRefineFragmentRelationshipType(fragment, nextNode, abstractNodeTemplate, abstractTopologyTemplate, refinLevelGraphNode, sourceNodeTemplate, prevRelationshipTemplates);

					}
				}
			}
		}

		fragmentNodesQueue.remove(startNode);

	}

	private void startRefineFragmentRelationshipType(TopologyTemplate fragment, LevelGraphNode refineNode, NodeTemplate abstractNodeTemplate, TopologyTemplate abstractTopologyTemplate,
			LevelGraphNode refinLevelGraphNode, ArrayList<NodeTemplate> sourceNodeTemplates, ArrayList<RelationshipTemplate> prevRelationshipTemplates) {

		for (LevelGraphRelation levelGraphRelation : refineNode.getOutLevelGraphRelations()) {
			for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
				System.out.println("ConnectOverTo" + levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO));

				if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
					System.out.println(levelGraphRelation.getTargetNodeId() + "== " + refineRelation.getTargetNodeId());

					if (levelGraphRelation.getTargetNodeId() == refineRelation.getTargetNodeId()) {

						System.out.println("SelfLoop" + !isSourceNodeEqualsTargetNode(sourceNodeTemplates, levelGraphRelation.getTargetNodeId()));

						if (!isSourceNodeEqualsTargetNode(sourceNodeTemplates, levelGraphRelation.getTargetNodeId())) {
							ArrayList<RelationshipTemplate> nextRelationshipTempalte = new ArrayList<RelationshipTemplate>();
							nextRelationshipTempalte.addAll(createSpezificRelationshipTemplate(fragment, refineNode, sourceNodeTemplates, null, abstractTopologyTemplate));

							System.out.println("TargetNode noch nicht verfeinert" + !levelGraphRelation.getTargetLevelGraphNode().isRefined());

							if (!levelGraphRelation.getTargetLevelGraphNode().isRefined()) {

								if (refineRelation.isEntryPoint()) {
									nextRelationshipTempalte.addAll(prevRelationshipTemplates);
								}

								startRefineFragmentNodeType(fragment, levelGraphRelation.getTargetLevelGraphNode(), abstractNodeTemplate, prevRelationshipTemplates, nextRelationshipTempalte,
										abstractTopologyTemplate, refinLevelGraphNode);
							} else {

								for (RelationshipTemplate relationshipTemplate : nextRelationshipTempalte) {
									relationshipTemplate.setTargetNodeId(levelGraphRelation.getTargetLevelGraphNode().getTempId());
								}

							}
						}
					}
				}
			}
		}

		fragmentNodesQueue.remove(refineNode);

	}

	private boolean isSourceNodeEqualsTargetNode(ArrayList<NodeTemplate> sourceNodeTemplates, Long targetNodeId) {

		for (NodeTemplate soruceNode : sourceNodeTemplates) {
			System.out.println(soruceNode.getLevelGraphNodeId() + " == " + targetNodeId);
			if (soruceNode.getLevelGraphNodeId() == targetNodeId) {
				return true;
			}
		}

		return false;
	}

	private NodeTemplate createNewSpezificNodeTemplate(LevelGraphNode refineLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			TopologyTemplate abstractTopologyTemplate, TopologyTemplate fragmentPart) {

		// Erstelle neuen spezifischen NodeTemplate
		NodeTemplate spezificNodeTemplate = new NodeTemplate();

		// Hole den NodeType vom LevelGraph Knoten
		NodeType nodeType = nodeTypeService.findById(refineLevelGraphNode.getLevelGraphNodeTypeId());
		spezificNodeTemplate.getProvidedProperties().addAll(refineLevelGraphNode.getProvidedProperties());
		spezificNodeTemplate.getProvidedProperties().addAll(abstractNodeTemplate.getProvidedProperties());
		spezificNodeTemplate.getExpectedProperties().addAll(abstractNodeTemplate.getExpectedProperties());
		spezificNodeTemplate.setTempId(tempIdGenerator);
		spezificNodeTemplate.setName(refineLevelGraphNode.getName());
		spezificNodeTemplate.setIcon(refineLevelGraphNode.getIcon());
		spezificNodeTemplate.setLevelGraphNode(refineLevelGraphNode);
		spezificNodeTemplate.setLevelGraphNodeId(refineLevelGraphNode.getId());
		spezificNodeTemplate.setTopologyTemplate(spezificTopologyTemplate);
		spezificNodeTemplate.setNodeType(nodeType);
		spezificNodeTemplate.setNodeTypeId(refineLevelGraphNode.getLevelGraphNodeTypeId());
		spezificNodeTemplate.setAbstractionLevel(startAbstractionLevel + 1);
		refineLevelGraphNode.setTempId(tempIdGenerator);

		if (!prevRelationshipTemplates.isEmpty()) {

			for (RelationshipTemplate relationshipTemplate : prevRelationshipTemplates) {

				for (LevelGraphRelation connectRelation : refineLevelGraphNode.getInLevelGraphRelations()) {
					System.out.println(relationshipTemplate.getLevelGraphNode().getId() == connectRelation.getSourceLevelGraphNode().getId());
					if (relationshipTemplate.getLevelGraphNode().getId() == connectRelation.getSourceLevelGraphNode().getId()) {

						if (relationshipTemplate.getTargetNodeId() != null) {

							RelationshipTemplate copyRelationshipTemplate = relationshipTemplate.clone(relationshipTemplate.getTopologyTemplate(), relationshipTemplate.getSourceNodeTemplate(),
									relationshipTemplate.getTargetNodeTemplate());
							copyRelationshipTemplate.setTargetNodeId(tempIdGenerator);
							fragmentPart.getRelationshipTemplates().add(copyRelationshipTemplate);
						} else {
							relationshipTemplate.setTargetNodeId(tempIdGenerator);
						}
					}
				}
			}
		}

		for (int i = 0; i < abstractTopologyTemplate.getNodeTemplates().size(); i++) {
			if (abstractTopologyTemplate.getNodeTemplates().get(i).getId() == abstractNodeTemplate.getId()) {
				abstractTopologyTemplate.getNodeTemplates().get(i).setTempId(tempIdGenerator);
			}
		}

		fragmentPart.getNodeTemplates().add(spezificNodeTemplate);
		tempIdGenerator++;

		return spezificNodeTemplate;
	}

	private ArrayList<RelationshipTemplate> createSpezificRelationshipTemplate(TopologyTemplate fragment, LevelGraphNode levelGraphNodeRelationshipType, ArrayList<NodeTemplate> sourceNodeTemplates,
			RelationshipTemplate abstractRelationshipTemplate, TopologyTemplate abstractTopologyTemplate) {
		ArrayList<RelationshipTemplate> spezificRelationshipTemplates = new ArrayList<RelationshipTemplate>();

		for (NodeTemplate sourceNode : sourceNodeTemplates) {
			for (LevelGraphRelation connectToRelation : sourceNode.getLevelGraphNode().getOutLevelGraphRelations()) {
				System.out.println(connectToRelation.getTargetNodeId() + " == " + levelGraphNodeRelationshipType.getId());
				if (connectToRelation.getTargetNodeId() == levelGraphNodeRelationshipType.getId()) {
					RelationshipTemplate spezificRelationshipTemplate = new RelationshipTemplate();
					spezificRelationshipTemplate.getProvidedProperties().addAll(levelGraphNodeRelationshipType.getProvidedProperties());
					spezificRelationshipTemplate.setName(levelGraphNodeRelationshipType.getName());
					spezificRelationshipTemplate.setIcon(levelGraphNodeRelationshipType.getIcon());
					spezificRelationshipTemplate.setLevelGraphNode(levelGraphNodeRelationshipType);
					spezificRelationshipTemplate.setLevelGraphNodeId(levelGraphNodeRelationshipType.getId());
					spezificRelationshipTemplate.setAbstractionLevel(startAbstractionLevel + 1);
					spezificRelationshipTemplate.setIcon(levelGraphNodeRelationshipType.getIcon());
					spezificRelationshipTemplate.setTopologyTemplate(spezificTopologyTemplate);
					spezificRelationshipTemplate.setRelationshipType(relationshipTypeService.findById(levelGraphNodeRelationshipType.getLevelGraphNodeTypeId()));
					spezificRelationshipTemplate.setRelationshipTypeId(levelGraphNodeRelationshipType.getLevelGraphNodeTypeId());
					if (abstractRelationshipTemplate != null) {
						spezificRelationshipTemplate.getProvidedProperties().addAll(abstractRelationshipTemplate.getProvidedProperties());
						spezificRelationshipTemplate.getExpectedProperties().addAll(abstractRelationshipTemplate.getExpectedProperties());
					}

					spezificRelationshipTemplate.setSourceNodeTemplate(sourceNode);
					spezificRelationshipTemplate.setSourceNodeId(sourceNode.getTempId());
					spezificRelationshipTemplates.add(spezificRelationshipTemplate);
					fragment.getRelationshipTemplates().add(spezificRelationshipTemplate);

				}
			}

		}

		return spezificRelationshipTemplates;
	}

	private boolean existNotVisitedOutRelation(NodeTemplate abstractNodeTemplate) {
		for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
			if (!abstractRelationshipTemplate.isRefined()) {
				return true;
			}
		}
		return false;
	}

	private boolean isSpecificEqualsAbstract(TopologyTemplate topologyTemplate, int startAbstractionLevel2) {

		for (NodeTemplate nodeTemplate : topologyTemplate.getNodeTemplates()) {
			if (nodeTemplate.getAbstractionLevel() > startAbstractionLevel) {
				return false;
			}
		}

		for (RelationshipTemplate relationshipTemplate : topologyTemplate.getRelationshipTemplates()) {
			if (relationshipTemplate.getAbstractionLevel() > startAbstractionLevel) {
				return false;
			}
		}

		return true;
	}

	// Kompatibilitätsprüfung
	private boolean isCompatibleToPrevRefinement(ArrayList<LevelGraphNode> sourceNodeQueue, ArrayList<LevelGraphNode> targetNodeQueue, boolean isNextRefined) {

		for (LevelGraphNode source : sourceNodeQueue) {

			for (LevelGraphRelation outConnectRelation : source.getOutLevelGraphRelations()) {

				if (outConnectRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {

					for (LevelGraphNode target : targetNodeQueue) {

						if (outConnectRelation.getTargetNodeId() == target.getId()) {

							if (isNextRefined) {
								// TODO
								// for (NodeTemplate nodeTemplate : abstractTopologyTemplate.getNodeTemplates()) {
								// if (nodeTemplate.getId() == abstractRelationshipTemplate.getTargetNodeId()) {
								//
								// spezificRelationshipTemplate.setTargetNodeId(nodeTemplate.getTempId());
								//
								// }
								// }
								return false;
							} else {
								return true;
							}

						}
					}
				}
			}
		}

		return false;

	}

	// SMI metrics Prüfung
	private boolean smiThresholdExceeded(Collection<ProvidedProperty> providedProperties, Collection<ExpectedProperty> expectedProperties) {

		if (expectedProperties.size() == 0) {
			return true;
		}

		int number_of_matches = 0;
		for (ProvidedProperty providedProperty : providedProperties) {
			for (ExpectedProperty expectedProperty : expectedProperties) {
				if (providedProperty.getValue().equals(expectedProperty.getValue())) {
					number_of_matches++;
				}
			}
		}

		if (smi <= ((float) number_of_matches / (float) expectedProperties.size())) {
			return true;
		}

		return false;
	}
	// for (NodeTemplate nodeTemplate : abstractTopologyTemplate.getNodeTemplates()) {
	// if (nodeTemplate.getId() == abstractRelationshipTemplate.getSourceNodeId()) {
	// spezificRelationshipTemplate.setSourceNodeId(nodeTemplate.getTempId());
	// }
	// }

	// sourceNodeTemplate.getOutRelationshipTemplates().add(spezificRelationshipTemplate);

	// if (abstractRelationshipTemplate != null && abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {
	//
	// System.out.println(abstractRelationshipTemplate.getId());
	// System.out.println(abstractRelationshipTemplate.getTargetNodeId());
	//
	// for (NodeTemplate nodeTemplate : abstractTopologyTemplate.getNodeTemplates()) {
	// System.out.println(nodeTemplate.getTempId());
	// if (nodeTemplate.getId() == abstractRelationshipTemplate.getTargetNodeId()) {
	//
	// System.out.println(nodeTemplate.getTempId());
	// spezificRelationshipTemplate.setTargetNodeId(nodeTemplate.getTempId());
	//
	// }
	// }
	//
	// }
}
