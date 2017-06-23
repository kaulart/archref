package de.arthurkaul.archref.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.Constants;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;
import de.arthurkaul.archref.model.topology.TopologyTemplate;
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

	public float smi = 0.0f;
	public LevelGraph levelGraph;
	public TopologyTemplate startTopologyTemplate;
	public int targetAbstractionLevel;
	ArrayList<NodeTemplate> queueNodeTemplates;
	ArrayList<RelationshipTemplate> queueRelationshipTemplates;
	TopologyTemplate spezificTopologyTemplate;
	TopologyTemplate abstractTopologyTemplate;
	int startAbstractionLevel;

	public TopologyTemplate initializeRefinement() {

		// Splitten vom Level Graphen
		levelGraph.splitNodesAndRelations();

		// Setzte die Knoten und Kante der Topology initial auf refined false und visited false
		for (NodeTemplate nodeTemplate : startTopologyTemplate.getNodeTemplates()) {
			nodeTemplate.setVisited(false);
			nodeTemplate.setRefined(false);
		}

		for (RelationshipTemplate relationshipTemplate : startTopologyTemplate.getRelationshipTemplates()) {
			relationshipTemplate.setVisited(false);
			relationshipTemplate.setRefined(false);
		}

		abstractTopologyTemplate = startTopologyTemplate;

		startTopologyTemplate = startRefinement();

		return startTopologyTemplate;
	}

	public TopologyTemplate startRefinement() {

		startAbstractionLevel = abstractTopologyTemplate.getAbstractionLevel();

		if (targetAbstractionLevel <= startAbstractionLevel) {
			return abstractTopologyTemplate;
		}

		abstractTopologyTemplate = startRefinementStep(abstractTopologyTemplate);

		for (TopologyTemplate spezificTopologyTemplate : abstractTopologyTemplate.getChildTopologyTemplates()) {
			abstractTopologyTemplate = spezificTopologyTemplate;
			spezificTopologyTemplate = startRefinement();
		}

		return abstractTopologyTemplate;

	}

	private TopologyTemplate startRefinementStep(TopologyTemplate abstractTopologyTemplate) {

		// Initialisieren der queu
		queueNodeTemplates = new ArrayList<NodeTemplate>(abstractTopologyTemplate.getNodeTemplates());
		queueRelationshipTemplates = new ArrayList<RelationshipTemplate>(abstractTopologyTemplate.getRelationshipTemplates());

		// Wähle einen beliebigen knoten aus der Topology als Startknoten aus
		NodeTemplate startNodeTemplate = queueNodeTemplates.iterator().next();

		// Neue Spezifische Topology Template initialisieren
		spezificTopologyTemplate = new TopologyTemplate();
		spezificTopologyTemplate.setName("RefinedTopologyTemplate");
		spezificTopologyTemplate.setAbstractionLevel(startAbstractionLevel + 1);
		spezificTopologyTemplate.setParentTopologyTemplate(abstractTopologyTemplate);
		spezificTopologyTemplate.setParentTopologyTemplateID(abstractTopologyTemplate.getId());

		// Start DFS der Rekrusiven Prozedur
		refineNodeTemplate(null, startNodeTemplate);

		return abstractTopologyTemplate;
	}

	private void refineNodeTemplate(RelationshipTemplate prevRelationshipTemplate, NodeTemplate abstractNodeTemplate) {
		abstractNodeTemplate.setVisited(true);
		// Gehe für jeden Level Graph Knoten vom Type Nodetype im aktuellen abstraktions level durch
		for (LevelGraphNode levelGraphNodeNodeType : levelGraph.getNodeTypes().get(startAbstractionLevel)) {

			// Prüfe ob ein Knoten vom selben Nodetype ist
			System.out.println(levelGraphNodeNodeType.getLevelGraphNodeTypeId() + "==" + abstractNodeTemplate.getNodeTypeId());
			if (levelGraphNodeNodeType.getLevelGraphNodeTypeId() == abstractNodeTemplate.getNodeTypeId()) {

				System.out.println("OutRelations" + levelGraphNodeNodeType.getOutLevelGraphRelations().size());
				// Gehe für den Level Graph Knoten alle ausgehenden kanten durch
				for (LevelGraphRelation levelGraphRelation : levelGraphNodeNodeType.getOutLevelGraphRelations()) {

					// Prüfe ob die kante eine Refine To kante ist
					if (levelGraphRelation.getLevelGraphRelationType().equals(Constants.REFINE_TO)) {

						LevelGraphNode refinLevelGraphNode = levelGraphRelation.getSourceLevelGraphNode();
						// LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(levelGraphRelation.getSourceNodeId());
						// Erfüllt der Verfeinerungsknoten die Erwarteten eigenschaften und überschreitet den angegebenen SMI
						if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractNodeTemplate.getExpectedProperties())) {

							// Verfeinerungs Knoten ist vom Typ NodeType es handelt sich um eine Eins zu eins verfeinerung
							if (refinLevelGraphNode.getLevelGraphNodeType().equals(Constants.NODETYPE)) {

								// Ist der VerfeinerungsKnoten Kompatibel zum vorgänger Knoten
								if (prevRelationshipTemplate == null || prevRelationshipTemplate.getAbstractionLevel() == startAbstractionLevel
										|| existConnectOverToRelationBetween(prevRelationshipTemplate.getLevelGraphNode(), refinLevelGraphNode)) {

									// Erstelle neuen spezifischen NodeTemplate
									NodeTemplate spezificNodeTemplate = new NodeTemplate();
									spezificNodeTemplate.setProvidedProperties(refinLevelGraphNode.getProvidedProperties());
									spezificNodeTemplate.setExpectedProperties(abstractNodeTemplate.getExpectedProperties());
									spezificNodeTemplate.setName(refinLevelGraphNode.getName());
									spezificNodeTemplate.setIcon(refinLevelGraphNode.getIcon());
									spezificNodeTemplate.setLevelGraphNode(refinLevelGraphNode);
									spezificNodeTemplate.setLevelGraphNodeId(refinLevelGraphNode.getId());

									// TODO ID of TOpology
									spezificNodeTemplate.setTopologyTemplate(spezificTopologyTemplate);
									spezificNodeTemplate.setNodeType(nodeTypeService.findById(refinLevelGraphNode.getLevelGraphNodeTypeId()));
									spezificNodeTemplate.setNodeTypeId(refinLevelGraphNode.getLevelGraphNodeTypeId());
									spezificNodeTemplate.setAbstractionLevel(startAbstractionLevel + 1);
									if (prevRelationshipTemplate != null) {
										// TODO ?? ID
										prevRelationshipTemplate.setTargetNodeId(spezificNodeTemplate.getId());
										prevRelationshipTemplate.setTargetNodeTemplate(spezificNodeTemplate);
									}

									// Füge Node Template zu
									spezificTopologyTemplate.getNodeTemplates().add(spezificNodeTemplate);
									abstractNodeTemplate.setRefined(true);

									// Entferne Knoten aus der QUeue vorrübergehend
									queueNodeTemplates.remove(abstractNodeTemplate);

									// Verfeinere jede ausgehende Kannte
									for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
										if (!abstractRelationshipTemplate.isVisited()) {
											refineRelationshipTemplate(spezificNodeTemplate, abstractRelationshipTemplate, startAbstractionLevel);
										}
									}

									// for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getInRelationshipTemplates()) {
									//
									// if (!abstractRelationshipTemplate.isVisited()) {
									// refineRelationshipTemplate(spezificNodeTemplate, abstractRelationshipTemplate, startAbstractionLevel);
									// }
									// }

									//
									// Es wurden noch nicht alle Knoten im Verfeinerungsprozess besucht und es wurde eine Verfeinerung gefunden
									if (!queueNodeTemplates.isEmpty()) {

										// Jump Call zum nächsten knoten in der liste
										if (!queueNodeTemplates.isEmpty()) {
											abstractNodeTemplate = queueNodeTemplates.iterator().next();
											refineNodeTemplate(null, abstractNodeTemplate);
										}

									} else {
										// Alle Knoten und Kanten wurden im Verfeinerungsprozess besucht und es wurde eine Verfeinerung gefunden
										// ansonsten add spezifische Topologie zu verfeinerte und füge den Knoten wieder zur queue hinzu
										if (isSpecificEqualsAbstract(spezificTopologyTemplate, startAbstractionLevel)) {

										} else {
											abstractTopologyTemplate.getChildTopologyTemplates().add(spezificTopologyTemplate);
											topologyTemplateService.create(spezificTopologyTemplate);
											// TODO ID updaten?
										}

										spezificTopologyTemplate.getNodeTemplates().remove(spezificNodeTemplate);
										if (prevRelationshipTemplate != null) {
											prevRelationshipTemplate.setTargetNodeId(null);
											prevRelationshipTemplate.setTargetNodeTemplate(null);
										}

									}

								}
							}

							// Ist es eine verfeinerung über ein Fragment
							else if (refinLevelGraphNode.getLevelGraphNodeType().equals(Constants.NODETYPEFRAGMENT)) {
								// TODO Fragment handling
							}
						}
					}
				}
			}
		}
		// wenn node Template noch nicht verfeinert wurde copy erstellen mit höheren level marken und weiter callen
		// if(){
		// for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
		// refineRelationshipTemplate();
		// }
		// }

		queueNodeTemplates.remove(abstractNodeTemplate);

	}

	private void refineRelationshipTemplate(NodeTemplate sourceNodeTemplate, RelationshipTemplate abstractRelationshipTemplate, int startAbstractionLevel) {

		for (LevelGraphNode levelGraphNodeRelationshipType : levelGraph.getRelationshipTypes().get(startAbstractionLevel)) {
			System.out.println(levelGraphNodeRelationshipType.getLevelGraphNodeTypeId() == abstractRelationshipTemplate.getRelationshipTypeId());
			if (levelGraphNodeRelationshipType.getLevelGraphNodeTypeId() == abstractRelationshipTemplate.getRelationshipTypeId()) {
				// Prüfe ob eine Verfeinerungskante existiert
				for (LevelGraphRelation refinRelationshipType : levelGraphNodeRelationshipType.getOutLevelGraphRelations()) {
					System.out.println(refinRelationshipType.getLevelGraphRelationType().equals(Constants.REFINE_TO));
					if (refinRelationshipType.getLevelGraphRelationType().equals(Constants.REFINE_TO)) {
						// Prüfe ob Threshold erfüllt ist
						if (smiThresholdExceeded(levelGraphNodeRelationshipType.getProvidedProperties(), abstractRelationshipTemplate.getExpectedProperties())) {
							System.out.println(levelGraphNodeRelationshipType.getLevelGraphNodeType().equals(Constants.RELATIONSHIPTYPE));
							if (levelGraphNodeRelationshipType.getLevelGraphNodeType().equals(Constants.RELATIONSHIPTYPE)) {
								System.out.println(existConnectOverToRelationBetween(levelGraphNodeRelationshipType, sourceNodeTemplate.getLevelGraphNode()));

								if (existConnectOverToRelationBetween(levelGraphNodeRelationshipType, sourceNodeTemplate.getLevelGraphNode())) {

									RelationshipTemplate spezificRelationshipTemplate = new RelationshipTemplate();

									spezificRelationshipTemplate.setProvidedProperties(levelGraphNodeRelationshipType.getProvidedProperties());
									spezificRelationshipTemplate.setExpectedProperties(abstractRelationshipTemplate.getExpectedProperties());
									spezificRelationshipTemplate.setName(levelGraphNodeRelationshipType.getName());
									spezificRelationshipTemplate.setIcon(levelGraphNodeRelationshipType.getIcon());
									spezificRelationshipTemplate.setLevelGraphNode(levelGraphNodeRelationshipType);
									spezificRelationshipTemplate.setLevelGraphNodeId(levelGraphNodeRelationshipType.getId());
									// TODO ID of TOpology
									spezificRelationshipTemplate.setTopologyTemplate(spezificTopologyTemplate);
									spezificRelationshipTemplate.setRelationshipType(relationshipTypeService.findById(levelGraphNodeRelationshipType.getLevelGraphNodeTypeId()));
									spezificRelationshipTemplate.setRelationshipTypeId(levelGraphNodeRelationshipType.getLevelGraphNodeTypeId());

									// TODO ID setting ?
									spezificRelationshipTemplate.setSourceNodeId(sourceNodeTemplate.getId());
									spezificRelationshipTemplate.setSourceNodeTemplate(sourceNodeTemplate);

									sourceNodeTemplate.getOutRelationshipTemplates().add(spezificRelationshipTemplate);

									spezificTopologyTemplate.getRelationshipTemplates().add(spezificRelationshipTemplate);

									abstractRelationshipTemplate.setRefined(true);
									abstractRelationshipTemplate.setVisited(true);
									System.out.println(!abstractRelationshipTemplate.getTargetNodeTemplate().isVisited());
									if (!abstractRelationshipTemplate.getTargetNodeTemplate().isVisited()) {
										refineNodeTemplate(spezificRelationshipTemplate, abstractRelationshipTemplate.getTargetNodeTemplate());
									}

									if (!queueNodeTemplates.isEmpty()) {

										// Jump Call zum nächsten knoten in der liste
										if (!queueNodeTemplates.isEmpty()) {
											NodeTemplate abstractNodeTemplate = queueNodeTemplates.iterator().next();
											refineNodeTemplate(null, abstractNodeTemplate);
										}

									} else {
										// Alle Knoten und Kanten wurden im Verfeinerungsprozess besucht und es wurde eine Verfeinerung gefunden
										// ansonsten add spezifische Topologie zu verfeinerte und füge den Knoten wieder zur queue hinzu
										// TODO und ist die Liste der Kinder leer dann wurde
										if (!isSpecificEqualsAbstract(spezificTopologyTemplate, startAbstractionLevel)) {

											abstractTopologyTemplate.getChildTopologyTemplates().add(spezificTopologyTemplate);
											topologyTemplateService.create(spezificTopologyTemplate);
											// TODO ID updaten?
										}
									}

									spezificTopologyTemplate.getRelationshipTemplates().remove(spezificRelationshipTemplate);
									sourceNodeTemplate.getOutRelationshipTemplates().remove(spezificRelationshipTemplate);

								}

							}
							// Ist es eine verfeinerung über ein Fragment
							else if (levelGraphNodeRelationshipType.getLevelGraphNodeType().equals(Constants.RELATIONSHIPTYPEFRAGMENT)) {
								// TODO Fragment handling
							}
						}
					}
				}
			}
		}
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
	private boolean existConnectOverToRelationBetween(LevelGraphNode source, LevelGraphNode target) {

		for (LevelGraphRelation outRelation : source.getOutLevelGraphRelations()) {
			if (outRelation.getLevelGraphRelationType().equals(Constants.CONNECT_OVER_TO) && outRelation.getTargetNodeId() == target.getId()) {
				return true;
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
}
