package de.arthurkaul.archref.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.constants.LevelGraphNodeType;
import de.arthurkaul.archref.constants.LevelGraphRelationType;
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

/*******************************************************************************************************************************************************************************************************
 * 
 * @service RefinementService - The Refinement Service implements the algorithm for refine a topologyTemplate with a given level graph model. Currently the refinement service can only refine topology
 *          models which are single level graph compliant. But it is possible to change the algorithm so that also multiple compliant topologyTemplates can be processed by the algorithm.
 * 
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Service
public class RefinementService {

	// Services which are needed
	@Autowired
	LevelGraphNodeService levelGraphNodeService;

	@Autowired
	NodeTypeService nodeTypeService;

	@Autowired
	RelationshipTypeService relationshipTypeService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	// Satisfaction metrics index percentage value indicates how many percentage of expected properties should be satisfied
	private float smi = 0.0f;

	// Merged Level Graph which should be uses for the refinement
	private LevelGraph levelGraph;

	// Target abstractionLevel to which the topology should be refined
	private int targetAbstractionLevel;

	// Start abstractionLevel to which the topology should be refined
	private int startAbstractionLevel;

	// NodeTemplateQueue and RelationshipTemplate queue for the NodeTemplates and RelationsshipTemplates of the topology which is currently refined
	private ArrayList<NodeTemplate> queueNodeTemplates;
	private ArrayList<RelationshipTemplate> queueRelationshipTemplates;

	// Queues for the different types of Fragment Level Graph Nodes
	ArrayList<LevelGraphNode> fragmentNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> exitentryNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> entryNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> exitNodesQueue = new ArrayList<LevelGraphNode>();
	ArrayList<LevelGraphNode> includeNodesQueue = new ArrayList<LevelGraphNode>();

	// Queue for the refined topologies of one step which should be processed in a next refinement step if the target abstraction level is not reached
	ArrayList<TopologyTemplate> queueChildTopologyTemplate = new ArrayList<TopologyTemplate>();

	// Entry NodeTemplates and Exit NodeTemplates/RelationshipTemplates of one fragment refinement
	ArrayList<NodeTemplate> exitNodeTemplates = new ArrayList<NodeTemplate>();
	ArrayList<NodeTemplate> entryNodeTemplates = new ArrayList<NodeTemplate>();
	ArrayList<RelationshipTemplate> exitRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	// Current refined specific Topology
	private TopologyTemplate spezificTopologyTemplate;

	// temporary ID for the refined specific topology elements until a valid specific topology was found
	Long tempIdGenerator = 0l;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - initializeRefinement - Method initialize alle variables which are needed during the refinement process
	 * 
	 * @param levelGraph - Merged Level Graph which is used for the refinement
	 * @param startTopologyTemplate - Topology which was passed as input for the first refinement step
	 * @param targetAbstractionLevel - Abstraction level to which the refinement should be processed
	 * @param smi - Satisfaction metrics index is used to control how many percentage of expectedProperties should be fulfilled
	 * @return startTopologyTemplate - Return the start TopologyTemplate with his attached refined child TopologyTemplates
	 * 
	 ******************************************************************************************************************************************************************************************************/
	public TopologyTemplate initializeRefinement(LevelGraph levelGraph, TopologyTemplate startTopologyTemplate, int targetAbstractionLevel, float smi) {

		// Initialize values for the Refinement
		tempIdGenerator = 0l;
		this.targetAbstractionLevel = targetAbstractionLevel;
		this.levelGraph = levelGraph;
		this.smi = smi;

		// Split Nodes of the Level Graph into 4-partitions
		levelGraph.splitNodes();

		// Set all NodeTemplates of the abstract Topology initial to not refined
		for (NodeTemplate nodeTemplate : startTopologyTemplate.getNodeTemplates()) {
			nodeTemplate.setRefined(false);
		}

		// Set all RelationshipTemplates of the abstract Topology initial to not refined
		for (RelationshipTemplate relationshipTemplate : startTopologyTemplate.getRelationshipTemplates()) {
			relationshipTemplate.setRefined(false);
		}

		// Start the refinement process
		startTopologyTemplate = startRefinement(startTopologyTemplate);

		// Return the refined abstract TopologyTemplate
		return startTopologyTemplate;
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method startRefinement - Start the refinement of the abstract TopologyTemplate and start recursively the refinement for all generated specific topology templates until the target abstraction
	 *         level is reached
	 * 
	 * @param abstractTopologyTemplate - The TopologyTemplate which should be refined
	 * @return abstractTopologyTemplate - The abstractTopology with his refined childTopologyTemplates
	 ******************************************************************************************************************************************************************************************************/
	public TopologyTemplate startRefinement(TopologyTemplate abstractTopologyTemplate) {

		startAbstractionLevel = abstractTopologyTemplate.getAbstractionLevel();
		queueChildTopologyTemplate = new ArrayList<TopologyTemplate>();

		// Check if target abstraction level is reached
		if (targetAbstractionLevel <= startAbstractionLevel) {
			return abstractTopologyTemplate;
		}

		// start refinement step
		abstractTopologyTemplate = startRefinementStep(abstractTopologyTemplate);

		// for all generated specific child topologyTemplates start the refinement again
		for (TopologyTemplate spezificTopologyTemplate : queueChildTopologyTemplate) {
			spezificTopologyTemplate = startRefinement(spezificTopologyTemplate);
		}

		return abstractTopologyTemplate;

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method startRefinementStep - Start the first refinement step of the abstract TopologyTemplate with a randomly selected NodeTemplate of the abstract TopologyTemplate
	 * 
	 * @param abstractTopologyTemplate - get a abstract TopologyTemplate which should be refined
	 * @return abstractTopologyTemplate - return the abstract TopologyTemplate with all generated specific TopologyTemplates
	 ******************************************************************************************************************************************************************************************************/
	private TopologyTemplate startRefinementStep(TopologyTemplate abstractTopologyTemplate) {

		// Initialize the NodeTemplate Queue and RelationshipTemplate Queue
		queueNodeTemplates = new ArrayList<NodeTemplate>(abstractTopologyTemplate.getNodeTemplates());
		queueRelationshipTemplates = new ArrayList<RelationshipTemplate>(abstractTopologyTemplate.getRelationshipTemplates());

		// Select a NodeTemplate from which the algorithm should start
		NodeTemplate startNodeTemplate = queueNodeTemplates.iterator().next();

		// Generate a temporary specific TopologyTemplate which represent the current refine state
		spezificTopologyTemplate = new TopologyTemplate();
		spezificTopologyTemplate.setName("RefinedTopologyTemplate");
		spezificTopologyTemplate.setAbstractionLevel(abstractTopologyTemplate.getAbstractionLevel() + 1);
		spezificTopologyTemplate.setParentTopologyTemplate(abstractTopologyTemplate);
		spezificTopologyTemplate.setParentTopologyTemplateId(abstractTopologyTemplate.getId());

		// refine the Node Template
		refineNodeTemplate(new ArrayList<RelationshipTemplate>(), startNodeTemplate, abstractTopologyTemplate);

		return abstractTopologyTemplate;
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * 
	 * 
	 * @param prevRelationshipTemplates - previous refined relationshipTemplates
	 * @param abstractNodeTemplate - NodeTemplate which should be refined
	 * @param abstractTopologyTemplate - TopologyTemplate which should be refined
	 ******************************************************************************************************************************************************************************************************/
	private void refineNodeTemplate(ArrayList<RelationshipTemplate> prevRelationshipTemplates, NodeTemplate abstractNodeTemplate, TopologyTemplate abstractTopologyTemplate) {

		// Search in the current abstraction level of the level graph if a LGN exist with the same NT of the abstact NodeTemplate
		for (LevelGraphNode levelGraphNode : levelGraph.getNodeTypes().get(startAbstractionLevel)) {
			if (levelGraphNode.getLevelGraphNodeTypeId() == abstractNodeTemplate.getNodeTypeId()) {

				// Search if a refine relation exist which fulfill the expected properties
				for (LevelGraphRelation levelGraphRelation : levelGraphNode.getOutRefineRelations()) {
					LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(levelGraphRelation.getTargetNodeId());
					if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractNodeTemplate.getExpectedProperties())) {

						ArrayList<LevelGraphNode> preveNodeQueue = new ArrayList<LevelGraphNode>();
						ArrayList<LevelGraphNode> entryNodeQueue = new ArrayList<LevelGraphNode>();

						if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
							entryNodeQueue.add(refinLevelGraphNode);
						} else if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
							for (LevelGraphRelation entryRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
								System.out.println("EntryPoint: " + entryRelation.isEntryPoint());
								if (entryRelation.isEntryPoint()) {
									entryNodeQueue.add(entryRelation.getTargetLevelGraphNode());
								}
							}
						}

						if (!prevRelationshipTemplates.isEmpty()) {
							for (RelationshipTemplate prevRelationshipTemplate : prevRelationshipTemplates) {
								preveNodeQueue.add(prevRelationshipTemplate.getLevelGraphNode());
							}
						}

						// Check if the refinement is compatible to the previous refinement
						if (prevRelationshipTemplates.isEmpty() || isCompatibleToPrevRefinement(preveNodeQueue, entryNodeQueue, false)) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitNodeTemplates = new ArrayList<NodeTemplate>();
							entryNodeTemplates = new ArrayList<NodeTemplate>();

							// create the refined fragment and add it to the current specific TopologyTemplate
							fragment = createNodeTypeFragment(refinLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplates, abstractTopologyTemplate);
							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());

							abstractNodeTemplate.setExitNodeTemplates(exitNodeTemplates);
							abstractNodeTemplate.setEntryNodeTemplates(entryNodeTemplates);
							abstractNodeTemplate.setRefined(true);

							queueNodeTemplates.remove(abstractNodeTemplate);

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
								refineRelationshipTemplate(abstractRelationshipTemplate.getSourceNodeTemplate().getExitNodeTemplates(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {

								// Clone die Topology
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								deepCopy.updatePosition();
								topologyTemplateService.update(deepCopy);

								queueChildTopologyTemplate.add(deepCopy);
							}

							System.out.println("Prev Empty: " + !prevRelationshipTemplates.isEmpty());
							if (!prevRelationshipTemplates.isEmpty()) {

								for (RelationshipTemplate relationshipTemplate : prevRelationshipTemplates) {
									relationshipTemplate.setTargetNodeId(null);
								}
							}

							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().removeAll(fragment.getRelationshipTemplates());

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

						System.out.println("Next Refined: " + abstractRelationshipTemplate.getTargetNodeTemplate().isRefined());
						System.out.println("Kompatible: " + isCompatibleToPrevRefinement(sourceNodeQueue, targetNodeQueue, abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()));
						if (sourceNodeTemplates.isEmpty() || isCompatibleToPrevRefinement(sourceNodeQueue, targetNodeQueue, abstractRelationshipTemplate.getTargetNodeTemplate().isRefined())) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitRelationshipTemplates = new ArrayList<RelationshipTemplate>();

							fragment = createRelationshipTypeFragment(exitRelationshipTemplates, refinLevelGraphNode, abstractRelationshipTemplate, sourceNodeTemplates, abstractTopologyTemplate);
							System.out.println("Kompatible: " + abstractRelationshipTemplate.getTargetNodeTemplate().isRefined());

							if (abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {
								for (RelationshipTemplate relationshipTemplate : exitRelationshipTemplates) {
									for (LevelGraphRelation levelGraphRelation : relationshipTemplate.getLevelGraphNode().getOutLevelGraphRelations()) {
										if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
											for (NodeTemplate nodeTemplate : abstractRelationshipTemplate.getTargetNodeTemplate().getEntryNodeTemplates()) {
												if (levelGraphRelation.getTargetNodeId() == nodeTemplate.getLevelGraphNodeId()) {
													if (relationshipTemplate.getTargetNodeId() != null) {
														RelationshipTemplate copyRelationshipTemplate = relationshipTemplate.clone(relationshipTemplate.getTopologyTemplate(),
																relationshipTemplate.getSourceNodeTemplate(), relationshipTemplate.getTargetNodeTemplate());
														copyRelationshipTemplate.setTargetNodeId(nodeTemplate.getTempId());
														fragment.getRelationshipTemplates().add(copyRelationshipTemplate);
													} else {
														relationshipTemplate.setTargetNodeId(nodeTemplate.getTempId());
													}

												}
											}
										}
									}

									// relationshipTemplate.setTargetNodeId(abstractRelationshipTemplate.getTargetNodeTemplate().getTempId());
								}
							}

							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());
							abstractRelationshipTemplate.setRefined(true);

							queueRelationshipTemplates.remove(abstractRelationshipTemplate);
							// TODO hier target setzen
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
								refineRelationshipTemplate(abstractRelationshipTemplate.getSourceNodeTemplate().getExitNodeTemplates(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								deepCopy.updatePosition();
								topologyTemplateService.update(deepCopy);

								queueChildTopologyTemplate.add(deepCopy);

							}
							queueRelationshipTemplates.add(abstractRelationshipTemplate);
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().removeAll(fragment.getRelationshipTemplates());

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
			exitRelationshipTemplates.addAll(createSpezificRelationshipTemplate(fragment, refinLevelGraphNode, sourceNodeTemplates, abstractRelationshipTemplate, abstractTopologyTemplate));
		} else {

			fragmentNodesQueue = new ArrayList<LevelGraphNode>();
			exitentryNodesQueue = new ArrayList<LevelGraphNode>();
			entryNodesQueue = new ArrayList<LevelGraphNode>();
			exitNodesQueue = new ArrayList<LevelGraphNode>();
			includeNodesQueue = new ArrayList<LevelGraphNode>();

			for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
				refineRelation.getTargetLevelGraphNode().setRefined(false);
				if (refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					exitentryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (refineRelation.isEntryPoint() && !refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else if (!refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
				} else {
					includeNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					if (refineRelation.getTargetLevelGraphNode().getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
						fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					}

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
				if (refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());

				} else if (refineRelation.isEntryPoint() && !refineRelation.isExitPoint()) {
					entryNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());

				} else if (!refineRelation.isEntryPoint() && refineRelation.isExitPoint()) {
					exitNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());

				} else {
					includeNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					if (refineRelation.getTargetLevelGraphNode().getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
						fragmentNodesQueue.add(refineRelation.getTargetLevelGraphNode());
					}
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
		System.out.println();

		ArrayList<NodeTemplate> sourceNodeTemplate = new ArrayList<NodeTemplate>();
		NodeTemplate tempNodeTemplate = createNewSpezificNodeTemplate(startNode, abstractNodeTemplate, prev, abstractTopologyTemplate, fragment);
		sourceNodeTemplate.add(tempNodeTemplate);

		for (LevelGraphNode exitNode : exitNodesQueue) {
			if (exitNode.getId() == startNode.getId()) {
				exitNodeTemplates.add(tempNodeTemplate);
			}
		}

		for (LevelGraphNode entryNode : entryNodesQueue) {
			if (entryNode.getId() == startNode.getId()) {
				entryNodeTemplates.add(tempNodeTemplate);
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

			for (LevelGraphNode includeNode : exitNodesQueue) {
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

					if (levelGraphRelation.getTargetNodeId().equals(refineRelation.getTargetNodeId())) {

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

		// for (LevelGraphNode exitentryNode : exitentryNodesQueue) {
		// if (exitentryNode.getId() == refineNode.getId() && !exitentryNode.isRefined()) {
		// createSpezificRelationshipTemplate(fragment, refineNode, sourceNodeTemplates, null, abstractTopologyTemplate);
		// }
		// }

		for (LevelGraphNode exitNode : exitNodesQueue) {
			if (exitNode.getId() == refineNode.getId()) {
				exitRelationshipTemplates.addAll(createSpezificRelationshipTemplate(fragment, refineNode, sourceNodeTemplates, null, abstractTopologyTemplate));

			}
		}

		fragmentNodesQueue.remove(refineNode);

	}

	private NodeTemplate createNewSpezificNodeTemplate(LevelGraphNode refineLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			TopologyTemplate abstractTopologyTemplate, TopologyTemplate fragmentPart) {

		// Erstelle neuen spezifischen NodeTemplate
		NodeTemplate spezificNodeTemplate = new NodeTemplate();

		// Hole den NodeType vom LevelGraph Knoten
		NodeType nodeType = nodeTypeService.findById(refineLevelGraphNode.getLevelGraphNodeTypeId());
		spezificNodeTemplate.getProvidedProperties().addAll(refineLevelGraphNode.getProvidedProperties());
		if (abstractNodeTemplate != null) {
			spezificNodeTemplate.getProvidedProperties().addAll(abstractNodeTemplate.getProvidedProperties());
			spezificNodeTemplate.getExpectedProperties().addAll(abstractNodeTemplate.getExpectedProperties());
		}
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
					System.out.println(relationshipTemplate.getLevelGraphNode().getId() + "==" + connectRelation.getSourceLevelGraphNode().getId());
					if (relationshipTemplate.getLevelGraphNode().getId() == connectRelation.getSourceLevelGraphNode().getId()) {

						if (relationshipTemplate.getTargetNodeId() != null) {

							RelationshipTemplate copyRelationshipTemplate = relationshipTemplate.clone(relationshipTemplate.getTopologyTemplate(), relationshipTemplate.getSourceNodeTemplate(),
									relationshipTemplate.getTargetNodeTemplate());
							copyRelationshipTemplate.setSourceNodeId(relationshipTemplate.getSourceNodeId());
							copyRelationshipTemplate.setTargetNodeId(tempIdGenerator);
							fragmentPart.getRelationshipTemplates().add(copyRelationshipTemplate);
						} else {
							relationshipTemplate.setTargetNodeId(tempIdGenerator);
						}
					}
				}
			}
		}

		if (abstractNodeTemplate != null) {
			for (int i = 0; i < abstractTopologyTemplate.getNodeTemplates().size(); i++) {
				if (abstractTopologyTemplate.getNodeTemplates().get(i).getId() == abstractNodeTemplate.getId()) {
					abstractTopologyTemplate.getNodeTemplates().get(i).setTempId(tempIdGenerator);
				}
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
				if (connectToRelation.getTargetNodeId().equals(levelGraphNodeRelationshipType.getId())) {
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

	private boolean isCompatibleToPrevRefinement(ArrayList<LevelGraphNode> sourceNodeQueue, ArrayList<LevelGraphNode> targetNodeQueue, boolean isNextRefined) {

		ArrayList<LevelGraphNode> targetValid = new ArrayList<LevelGraphNode>();
		for (LevelGraphNode source : new ArrayList<LevelGraphNode>(sourceNodeQueue)) {

			for (LevelGraphRelation outConnectRelation : source.getOutLevelGraphRelations()) {
				System.out.println("Kompatibilitätsrealtion:" + outConnectRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO));

				if (outConnectRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {

					for (LevelGraphNode target : new ArrayList<LevelGraphNode>(targetNodeQueue)) {
						System.out.println("Kompatibilitätsrealtion:" + (outConnectRelation.getTargetNodeId() == target.getId()));
						System.out.println("Kompatibilitätsrealtion:" + (outConnectRelation.getTargetNodeId() + " == " + target.getId()));

						if (outConnectRelation.getTargetNodeId().equals(target.getId())) {
							sourceNodeQueue.remove(source);
							targetValid.add(target);
						}
					}
				}
			}
		}

		targetNodeQueue.removeAll(targetValid);

		// TODO
		// if (isNextRefined) {
		//
		// return false;
		// } else {
		// return true;
		// }

		if (sourceNodeQueue.isEmpty() && targetNodeQueue.isEmpty()) {
			return true;
		} else {
			return false;
		}

	}

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

	private boolean isSourceNodeEqualsTargetNode(ArrayList<NodeTemplate> sourceNodeTemplates, Long targetNodeId) {

		for (NodeTemplate soruceNode : sourceNodeTemplates) {
			System.out.println(soruceNode.getLevelGraphNodeId() + " == " + targetNodeId);
			if (soruceNode.getLevelGraphNodeId() == targetNodeId) {
				return true;
			}
		}

		return false;
	}
}
