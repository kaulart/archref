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
	 * @method - refineNodeTemplate - Refine a NoeTemplate in the abstract TopologyTemplate
	 * 
	 * @param prevRelationshipTemplates - previous refined relationshipTemplates
	 * @param abstractNodeTemplate - NodeTemplate which should be refined
	 * @param abstractTopologyTemplate - TopologyTemplate which should be refined
	 * 
	 ******************************************************************************************************************************************************************************************************/
	private void refineNodeTemplate(ArrayList<RelationshipTemplate> prevRelationshipTemplates, NodeTemplate abstractNodeTemplate, TopologyTemplate abstractTopologyTemplate) {

		// Search in the current abstraction level of the level graph if a LevelGraphNode exist with the same NodeType as the abstract NodeTemplate which should be refined
		for (LevelGraphNode levelGraphNode : levelGraph.getNodeTypes().get(startAbstractionLevel)) {
			if (levelGraphNode.getLevelGraphNodeTypeId() == abstractNodeTemplate.getNodeTypeId()) {

				// Search if a refine relation exist which fulfill the expected properties
				for (LevelGraphRelation levelGraphRelation : levelGraphNode.getOutRefineRelations()) {
					LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(levelGraphRelation.getTargetNodeId());

					// SMI is a satisfaction metrics index which can be used to control the number of acceptable refinements if SMI is set to 1 all expectedProperties must be fulfilled
					// If SMI is set to 0 none of the expected properties must be fulfilled and every refinement relation is valid
					if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractNodeTemplate.getExpectedProperties())) {

						// The exit level graph nodes of previous refined fragment
						ArrayList<LevelGraphNode> prevExitNodeQueue = new ArrayList<LevelGraphNode>();

						// If no previous refined relationshipTemplates is empty no previous refinement exist
						if (!prevRelationshipTemplates.isEmpty()) {

							// Level Graph Node of the previous refineRelationshipTemplates from which the refined RelationshipTemplates are derived
							for (RelationshipTemplate prevRelationshipTemplate : prevRelationshipTemplates) {
								prevExitNodeQueue.add(prevRelationshipTemplate.getLevelGraphNode());
							}
						}

						// The entry level graph nodes of the current refined fragment
						ArrayList<LevelGraphNode> currentEntryNodeQueue = new ArrayList<LevelGraphNode>();

						// If the current Level Graph Node which is uses for refinement is a NodeType add this node to the Queue
						// Else if he is of the NodeTypeFragment add all Entry Level Graph Nodes of a the Fragment to the Queue
						if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
							currentEntryNodeQueue.add(refinLevelGraphNode);
						} else if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
							for (LevelGraphRelation entryRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
								System.out.println("EntryPoint: " + entryRelation.isEntryPoint());
								if (entryRelation.isEntryPoint()) {
									currentEntryNodeQueue.add(entryRelation.getTargetLevelGraphNode());
								}
							}
						}

						// Check if the refinement is compatible to the previous refinement or if no previous refinement exist
						// A NodeTemplate refinement must only be checked again a previous refinement
						if (prevRelationshipTemplates.isEmpty() || isCompatibleToPrevRefinement(prevExitNodeQueue, currentEntryNodeQueue)) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitNodeTemplates = new ArrayList<NodeTemplate>();
							entryNodeTemplates = new ArrayList<NodeTemplate>();

							// create the refined fragment and add it to the current specific TopologyTemplate
							fragment = createNodeTypeFragment(refinLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplates, abstractTopologyTemplate);
							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());

							// set a reference from the abstract Node Template to the exit and entry nodes of the refined fragment of the level graph
							abstractNodeTemplate.setExitNodeTemplates(exitNodeTemplates);
							abstractNodeTemplate.setEntryNodeTemplates(entryNodeTemplates);
							abstractNodeTemplate.setRefined(true);

							// remove the NodeTemplate temporary from the NodeTemplate Queue
							queueNodeTemplates.remove(abstractNodeTemplate);

							// If a not refined outgoing Relation exist refine the Relation
							if (existNotRefinedOutRelation(abstractNodeTemplate)) {

								for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
									if (!abstractRelationshipTemplate.isRefined()) {
										refineRelationshipTemplate(exitNodeTemplates, abstractRelationshipTemplate, abstractTopologyTemplate);
									}
								}
								// If the NodeTemplateQueue is not Empty refine the next NodeTemplate in the Queue
							} else if (!queueNodeTemplates.isEmpty()) {

								NodeTemplate nextAbstractNodeTemplate = queueNodeTemplates.iterator().next();
								refineNodeTemplate(new ArrayList<RelationshipTemplate>(), nextAbstractNodeTemplate, abstractTopologyTemplate);

								// If the RelationshipTempalteQueue is not Empty refine the next NodeTemplate in the Queue
							} else if (!queueRelationshipTemplates.isEmpty()) {

								RelationshipTemplate abstractRelationshipTemplate = queueRelationshipTemplates.iterator().next();
								refineRelationshipTemplate(abstractRelationshipTemplate.getSourceNodeTemplate().getExitNodeTemplates(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {

								// Clone the topology and persist it
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								deepCopy.updatePosition();
								topologyTemplateService.update(deepCopy);

								// Add the persisted TopologyTemplate to the childQeue for the next refinement
								queueChildTopologyTemplate.add(deepCopy);
							}

							// Undo the refinement of the current abstract NodeTemplate
							if (!prevRelationshipTemplates.isEmpty()) {
								for (RelationshipTemplate relationshipTemplate : prevRelationshipTemplates) {
									relationshipTemplate.setTargetNodeId(null);
								}
							}
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().removeAll(fragment.getRelationshipTemplates());

							// Add the NodeTemplate again to the Queue and set the refinement to false so that you can search for an other solution
							queueNodeTemplates.add(abstractNodeTemplate);
							abstractNodeTemplate.setRefined(false);

						}

					}
				}
			}
		}
		// Remove the NodeTemplate finally from the Queue
		queueNodeTemplates.remove(abstractNodeTemplate);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - refineRelationshipTemplate - Refine a RelationshipTemplate in the abstract TopologyTemplate
	 * 
	 * @param ArrayList<NodeTemplate> sourceNodeTemplates - previous refined sourceNodeTemplates
	 * @param abstractRelationshipTemplate - RelationshipTemplate which should be refined
	 * @param abstractTopologyTemplate - TopologyTemplate which should be refined
	 * 
	 ******************************************************************************************************************************************************************************************************/
	private void refineRelationshipTemplate(ArrayList<NodeTemplate> sourceNodeTemplates, RelationshipTemplate abstractRelationshipTemplate, TopologyTemplate abstractTopologyTemplate) {

		// Search in the current abstraction level of the level graph if a LevelGraphNode exist with the same RelationshipType as the abstract RelationshipTemplate which should be refined
		for (LevelGraphNode levelGraphNodeRelationshipType : levelGraph.getRelationshipTypes().get(startAbstractionLevel)) {
			if (levelGraphNodeRelationshipType.getLevelGraphNodeTypeId() == abstractRelationshipTemplate.getRelationshipTypeId()) {

				// Search if a refine relation exist which fulfill the expected properties
				for (LevelGraphRelation refinRelationshipType : levelGraphNodeRelationshipType.getOutRefineRelations()) {
					LevelGraphNode refinLevelGraphNode = levelGraphNodeService.findById(refinRelationshipType.getTargetNodeId());

					// SMI is a satisfaction metrics index which can be used to control the number of acceptable refinements if SMI is set to 1 all expectedProperties must be fulfilled
					// If SMI is set to 0 none of the expected properties must be fulfilled and every refinement relation is valid
					if (smiThresholdExceeded(refinLevelGraphNode.getProvidedProperties(), abstractRelationshipTemplate.getExpectedProperties())) {

						// The exit level graph nodes of previous refined fragment
						ArrayList<LevelGraphNode> prevExitNodeQueue = new ArrayList<LevelGraphNode>();

						// If no previous sourceNodeTemplates is empty no previous refinement exist
						if (!sourceNodeTemplates.isEmpty()) {

							// Level Graph Node of the previous refined NodeTemplates from which the refined RelationshipTemplates are derived
							for (NodeTemplate sourceNode : sourceNodeTemplates) {
								prevExitNodeQueue.add(sourceNode.getLevelGraphNode());
							}
						}

						// The entry level graph nodes of the current refined fragment
						ArrayList<LevelGraphNode> currentEntryNodeQueue = new ArrayList<LevelGraphNode>();
						ArrayList<LevelGraphNode> currentExitNodeQueue = new ArrayList<LevelGraphNode>();

						// If the current Level Graph Node which is uses for refinement is a RELATIONSHIPTYPE add this node to the Queue
						// Else if he is of the RELATIONSHIPTYPEFRAGMENT add all Entry Level Graph Nodes of a the Fragment to the Queue
						if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPE)) {
							currentEntryNodeQueue.add(refinLevelGraphNode);
						} else if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT)) {
							for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
								if (refineRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.REFINE_TO)) {
									if (refineRelation.isEntryPoint()) {
										currentEntryNodeQueue.add(refineRelation.getTargetLevelGraphNode());
									} else if (refineRelation.isExitPoint()) {
										currentExitNodeQueue.add(refineRelation.getTargetLevelGraphNode());
									}
								}

							}
						}

						// If target of RelationshipTempalte is refined get the entryNodes of the refinement
						ArrayList<LevelGraphNode> nextEntryNodeQueue = new ArrayList<LevelGraphNode>();
						if (abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {

							// Level Graph Node of the previous refined NodeTemplates from which the refined RelationshipTemplates are derived
							for (NodeTemplate entryNode : abstractRelationshipTemplate.getTargetNodeTemplate().getEntryNodeTemplates()) {
								nextEntryNodeQueue.add(entryNode.getLevelGraphNode());
							}
						}

						// Check if the refinement is compatible to the previous refinement or if no previous refinement exist
						// A RelationshipTempalte refinement must be checked again a previous and the next refinement because the target node of the abstract RelationshipTempalte may be already
						// refined
						if (sourceNodeTemplates.isEmpty()
								|| isCompatibleToPrevRefinement(prevExitNodeQueue, currentEntryNodeQueue) && isCompatibleNextRefinement(currentExitNodeQueue, nextEntryNodeQueue)) {

							TopologyTemplate fragment = new TopologyTemplate();
							exitRelationshipTemplates = new ArrayList<RelationshipTemplate>();

							// create the refined fragment and add it to the current specific TopologyTemplate
							fragment = createRelationshipTypeFragment(exitRelationshipTemplates, refinLevelGraphNode, abstractRelationshipTemplate, sourceNodeTemplates, abstractTopologyTemplate);

							// if the target NodeTemplate of the abstract RelationshipTemplate is refined connect the refinement with the refinement of the target Node Template of the abstract
							// Relationship Template
							if (abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {

								// Connect every exit relationshipTemplate with a compatible entry NodeTemplate of the next refinement
								for (RelationshipTemplate relationshipTemplate : exitRelationshipTemplates) {
									for (LevelGraphRelation levelGraphRelation : relationshipTemplate.getLevelGraphNode().getOutLevelGraphRelations()) {
										if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
											for (NodeTemplate nodeTemplate : abstractRelationshipTemplate.getTargetNodeTemplate().getEntryNodeTemplates()) {
												if (levelGraphRelation.getTargetNodeId() == nodeTemplate.getLevelGraphNodeId()) {

													// Clone the refined relationshipTemplate and create a new refined relationshipTemplate if it has already a target node
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
								}
							}

							// Add the refinement to the temporary specific TopologyTemplate and set the refined state of abstract RelationshipTemplate to true and remove it temporary from the
							// relationsshipTempalte Queue
							spezificTopologyTemplate.getNodeTemplates().addAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().addAll(fragment.getRelationshipTemplates());
							abstractRelationshipTemplate.setRefined(true);
							queueRelationshipTemplates.remove(abstractRelationshipTemplate);

							// If the target NodeTemplate of the abstract RelationshipTemplate is not refined start the refinement of the abstract NodeTemplate
							if (!abstractRelationshipTemplate.getTargetNodeTemplate().isRefined()) {
								refineNodeTemplate(exitRelationshipTemplates, abstractRelationshipTemplate.getTargetNodeTemplate(), abstractTopologyTemplate);

								// If the NodeTemplateQueue is not Empty refine the next NodeTemplate in the Queue
							} else if (!queueNodeTemplates.isEmpty()) {

								NodeTemplate abstractNodeTemplate = queueNodeTemplates.iterator().next();
								refineNodeTemplate(new ArrayList<RelationshipTemplate>(), abstractNodeTemplate, abstractTopologyTemplate);

								// If the RelationshipTempalteQueue is not Empty refine the next NodeTemplate in the Queue
							} else if (!queueRelationshipTemplates.isEmpty()) {

								abstractRelationshipTemplate = queueRelationshipTemplates.iterator().next();
								refineRelationshipTemplate(abstractRelationshipTemplate.getSourceNodeTemplate().getExitNodeTemplates(), abstractRelationshipTemplate, abstractTopologyTemplate);

							} else {
								// Clone the topology and persist it
								TopologyTemplate deepCopy = spezificTopologyTemplate.clone();
								topologyTemplateService.create(deepCopy);
								deepCopy.updateForeignKey();
								deepCopy.updatePosition();
								topologyTemplateService.update(deepCopy);

								// Add the persisted TopologyTemplate to the childQeue for the next refinement
								queueChildTopologyTemplate.add(deepCopy);

							}

							// Undo the refinement of the current abstract RelationshipTemplate
							spezificTopologyTemplate.getNodeTemplates().removeAll(fragment.getNodeTemplates());
							spezificTopologyTemplate.getRelationshipTemplates().removeAll(fragment.getRelationshipTemplates());

							// Add the Relation again to the Queue and set the refinement to false so that you can search for an other solution
							abstractRelationshipTemplate.setRefined(false);
							queueRelationshipTemplates.add(abstractRelationshipTemplate);

						}
					}
				}
			}
		}

		// Remove the NodeTemplate finally from the Queue
		queueRelationshipTemplates.remove(abstractRelationshipTemplate);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createRelationshipTypeFragment - Create a fragment for the specific TopologyTemplate
	 * 
	 * @param exitRelationshipTemplates - exit RelationshipTeplate of the refined Fragment
	 * @param refinLevelGraphNode - Level Graph Node which is used for the refinement
	 * @param abstractRelationshipTemplate - abstract RelationshipTemplate which should be refined
	 * @param sourceNodeTemplates - Source Node Templates of the previous refined fragment which are exit Nodes of the fragment
	 * @param abstractTopologyTemplate - Abstract TopologyTemplate which should be refined
	 * @return fragment - Refined TopologyTemplate Fragment
	 * 
	 ******************************************************************************************************************************************************************************************************/
	private TopologyTemplate createRelationshipTypeFragment(ArrayList<RelationshipTemplate> exitRelationshipTemplates, LevelGraphNode refinLevelGraphNode,
			RelationshipTemplate abstractRelationshipTemplate, ArrayList<NodeTemplate> sourceNodeTemplates, TopologyTemplate abstractTopologyTemplate) {

		TopologyTemplate fragment = new TopologyTemplate();

		// One to One Refinement create RelationshipTemplate from Level Graph Node
		if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPE)) {
			exitRelationshipTemplates.addAll(createSpezificRelationshipTemplate(fragment, refinLevelGraphNode, sourceNodeTemplates, abstractRelationshipTemplate, abstractTopologyTemplate));
		}

		// One to Many Refinement create TopologyTempalteFragment from Level Graph Node of RelationshipTypeFragment
		else {

			// Queues for the fragment Refinement
			fragmentNodesQueue = new ArrayList<LevelGraphNode>();
			exitentryNodesQueue = new ArrayList<LevelGraphNode>();
			entryNodesQueue = new ArrayList<LevelGraphNode>();
			exitNodesQueue = new ArrayList<LevelGraphNode>();
			includeNodesQueue = new ArrayList<LevelGraphNode>();

			// Split the Nodes of the Fragment into entry / exit and include Nodes
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

				// select a randomly start node for the fragment refinement
				LevelGraphNode startNode = fragmentNodesQueue.iterator().next();
				ArrayList<RelationshipTemplate> prev = new ArrayList<RelationshipTemplate>();

				// Refine the Level Graph Node according to his Type
				if (startNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
					startRefineNodeType(fragment, startNode, null, new ArrayList<RelationshipTemplate>(), prev, abstractTopologyTemplate, refinLevelGraphNode);
				} else {
					startRefineRelationshipType(fragment, startNode, null, abstractTopologyTemplate, refinLevelGraphNode, sourceNodeTemplates, prev);
				}

			}
		}
		return fragment;

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createNodeTypeFragment - Create a fragment for the specific TopoloyTemplate
	 * 
	 * @param refinLevelGraphNode - Level Graph Node which is used for the refinement
	 * @param abstractNodeTemplate - abstract NodeTemplate which should be refined
	 * @param prevRelationshipTemplates - RelationshipTemplates of the previous refined fragment which are exit Nodes of the fragment
	 * @param abstractTopologyTemplate - Abstract TopologyTemplate which should be refined
	 * @return fragment - Refined TopologyTemplate Fragment
	 ******************************************************************************************************************************************************************************************************/
	private TopologyTemplate createNodeTypeFragment(LevelGraphNode refinLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			TopologyTemplate abstractTopologyTemplate) {

		TopologyTemplate fragment = new TopologyTemplate();

		// One to One Refinement create NodeTemplate from Level Graph Node
		if (refinLevelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
			exitNodeTemplates.add(createNewSpecificNodeTemplate(refinLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplates, abstractTopologyTemplate, fragment));
		}

		// One to Many Refinement create TopologyTempalteFragment from Level Graph Node of NodeTypeFragment
		else {

			fragmentNodesQueue = new ArrayList<LevelGraphNode>();
			entryNodesQueue = new ArrayList<LevelGraphNode>();
			exitNodesQueue = new ArrayList<LevelGraphNode>();
			includeNodesQueue = new ArrayList<LevelGraphNode>();

			// Split the Nodes of the Fragment into entry / exit and include Nodes
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

				// select a randomly start node for the fragment refinement
				LevelGraphNode startNode = fragmentNodesQueue.iterator().next();
				ArrayList<RelationshipTemplate> prev = new ArrayList<RelationshipTemplate>();

				for (LevelGraphNode entryNode : entryNodesQueue) {
					if (entryNode.getId() == startNode.getId()) {
						prev.addAll(prevRelationshipTemplates);
					}
				}

				// Refine the Level Graph Node
				startRefineNodeType(fragment, startNode, abstractNodeTemplate, prevRelationshipTemplates, prev, abstractTopologyTemplate, refinLevelGraphNode);

			}

		}

		return fragment;
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - startRefineNodeType - Refine a Node Type in a Fragment
	 * 
	 * @param fragment - current Fragment which should be refined
	 * @param refineLevelGraphNode - Level Graph Node which is used for the refinement
	 * @param abstractNodeTemplate - abstract NodeTemplate of the refinement
	 * @param prevRelationshipTemplates - Previous RelationshipTemplates of the inner fragment refinement
	 * @param prevRelationshipTemplatesOfPrevFragmentRefinement - Previous RelationshipTemplates of the previous Fragment Refinement
	 * @param abstractTopologyTemplate - Abstract TopologyTemplate which should be refined
	 * @param fragmentLevelGraphNode - Level Graph Node of the fragment which should be refined
	 ******************************************************************************************************************************************************************************************************/
	private void startRefineNodeType(TopologyTemplate fragment, LevelGraphNode refineLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			ArrayList<RelationshipTemplate> prevRelationshipTemplatesOfPrevFragmentRefinement, TopologyTemplate abstractTopologyTemplate, LevelGraphNode fragmentLevelGraphNode) {

		ArrayList<NodeTemplate> sourceNodeTemplate = new ArrayList<NodeTemplate>();
		// create specific NodeTemplate from Level Graph Node of Type NodeType
		NodeTemplate tempNodeTemplate = createNewSpecificNodeTemplate(refineLevelGraphNode, abstractNodeTemplate, prevRelationshipTemplatesOfPrevFragmentRefinement, abstractTopologyTemplate,
				fragment);
		sourceNodeTemplate.add(tempNodeTemplate);

		// Add refined NodeTemplate to exitNodes of the refinedFragment
		for (LevelGraphNode entryNode : entryNodesQueue) {
			if (entryNode.getId() == refineLevelGraphNode.getId()) {
				entryNodeTemplates.add(tempNodeTemplate);
			}
		}

		// Add refined NodeTemplate to entryNodes of the refinedFragment
		for (LevelGraphNode exitNode : exitNodesQueue) {
			if (exitNode.getId() == refineLevelGraphNode.getId()) {
				exitNodeTemplates.add(tempNodeTemplate);
			}
		}

		// set refine to true
		refineLevelGraphNode.setRefined(true);

		// Search if a Include Node exist or a exit Node exist of Type RelationshipType and which is the connected with a Connect_Over_To relation with the Level Graph Node which is currently refined
		// in the fragment which
		// is not refined
		for (LevelGraphRelation connectRelation : refineLevelGraphNode.getOutLevelGraphRelations()) {
			for (LevelGraphNode includeNode : includeNodesQueue) {
				if (connectRelation.getTargetLevelGraphNode().getId() == includeNode.getId()) {
					if (!includeNode.isRefined()) {

						// Start the refinement of the next Level Graph Node of the RelationshipType in the Fragment
						LevelGraphNode nextNode = connectRelation.getTargetLevelGraphNode();
						startRefineRelationshipType(fragment, nextNode, abstractNodeTemplate, abstractTopologyTemplate, fragmentLevelGraphNode, sourceNodeTemplate, prevRelationshipTemplates);

					}
				}
			}

			//
			for (LevelGraphNode includeNode : exitNodesQueue) {
				if (connectRelation.getTargetLevelGraphNode().getId() == includeNode.getId()) {
					if (!includeNode.isRefined()) {

						// Start the refinement of the next Level Graph Node of the RelationshipType in the Fragment
						LevelGraphNode nextNode = connectRelation.getTargetLevelGraphNode();
						startRefineRelationshipType(fragment, nextNode, abstractNodeTemplate, abstractTopologyTemplate, fragmentLevelGraphNode, sourceNodeTemplate, prevRelationshipTemplates);

					}
				}
			}
		}

		// remove Level Graph Node from Fragment Queue
		fragmentNodesQueue.remove(refineLevelGraphNode);

	}

	private void startRefineRelationshipType(TopologyTemplate fragment, LevelGraphNode refineNode, NodeTemplate abstractNodeTemplate, TopologyTemplate abstractTopologyTemplate,
			LevelGraphNode refinLevelGraphNode, ArrayList<NodeTemplate> sourceNodeTemplates, ArrayList<RelationshipTemplate> prevRelationshipTemplates) {

		for (LevelGraphRelation levelGraphRelation : refineNode.getOutLevelGraphRelations()) {
			for (LevelGraphRelation refineRelation : refinLevelGraphNode.getOutLevelGraphRelations()) {
				if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
					if (levelGraphRelation.getTargetNodeId().equals(refineRelation.getTargetNodeId())) {

						if (!isSourceNodeEqualsTargetNode(sourceNodeTemplates, levelGraphRelation.getTargetNodeId())) {
							// Create specific RelationshipTemlate
							ArrayList<RelationshipTemplate> nextRelationshipTempalte = new ArrayList<RelationshipTemplate>();
							nextRelationshipTempalte.addAll(createSpezificRelationshipTemplate(fragment, refineNode, sourceNodeTemplates, null, abstractTopologyTemplate));

							if (!levelGraphRelation.getTargetLevelGraphNode().isRefined()) {

								if (refineRelation.isEntryPoint()) {
									nextRelationshipTempalte.addAll(prevRelationshipTemplates);
								}

								// Start the refinement of a the next Level Graph Node of the NodeType in the Fragment
								startRefineNodeType(fragment, levelGraphRelation.getTargetLevelGraphNode(), abstractNodeTemplate, prevRelationshipTemplates, nextRelationshipTempalte,
										abstractTopologyTemplate, refinLevelGraphNode);
							} else {

								// Connect the refined RelationshipTempalte in the fragment
								for (RelationshipTemplate relationshipTemplate : nextRelationshipTempalte) {
									relationshipTemplate.setTargetNodeId(levelGraphRelation.getTargetLevelGraphNode().getTempId());
								}

							}
						}
					}
				}
			}
		}

		for (LevelGraphNode exitNode : exitNodesQueue) {
			if (exitNode.getId() == refineNode.getId()) {
				exitRelationshipTemplates.addAll(createSpezificRelationshipTemplate(fragment, refineNode, sourceNodeTemplates, null, abstractTopologyTemplate));
			}
		}

		fragmentNodesQueue.remove(refineNode);

	}

	private NodeTemplate createNewSpecificNodeTemplate(LevelGraphNode refineLevelGraphNode, NodeTemplate abstractNodeTemplate, ArrayList<RelationshipTemplate> prevRelationshipTemplates,
			TopologyTemplate abstractTopologyTemplate, TopologyTemplate fragmentPart) {

		// Create new specificNodeTemplate
		NodeTemplate specificNodeTemplate = new NodeTemplate();

		// Hole den NodeType vom LevelGraph Knoten
		NodeType nodeType = nodeTypeService.findById(refineLevelGraphNode.getLevelGraphNodeTypeId());
		specificNodeTemplate.getProvidedProperties().addAll(refineLevelGraphNode.getProvidedProperties());
		if (abstractNodeTemplate != null) {
			specificNodeTemplate.getProvidedProperties().addAll(abstractNodeTemplate.getProvidedProperties());
			specificNodeTemplate.getExpectedProperties().addAll(abstractNodeTemplate.getExpectedProperties());
		}
		specificNodeTemplate.setTempId(tempIdGenerator);
		specificNodeTemplate.setName(refineLevelGraphNode.getName());
		specificNodeTemplate.setIcon(refineLevelGraphNode.getIcon());
		specificNodeTemplate.setLevelGraphNode(refineLevelGraphNode);
		specificNodeTemplate.setLevelGraphNodeId(refineLevelGraphNode.getId());
		specificNodeTemplate.setTopologyTemplate(spezificTopologyTemplate);
		specificNodeTemplate.setNodeType(nodeType);
		specificNodeTemplate.setNodeTypeId(refineLevelGraphNode.getLevelGraphNodeTypeId());
		refineLevelGraphNode.setTempId(tempIdGenerator);

		// Connect the previous relationshipTemplate with the NodeTemplate
		if (!prevRelationshipTemplates.isEmpty()) {
			for (RelationshipTemplate relationshipTemplate : prevRelationshipTemplates) {
				for (LevelGraphRelation connectRelation : refineLevelGraphNode.getInLevelGraphRelations()) {
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

		fragmentPart.getNodeTemplates().add(specificNodeTemplate);
		tempIdGenerator++;

		return specificNodeTemplate;
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

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method existNotRefinedOutRelation - Checks if a outgoing RelationshipTemplate of a abstract NodeTemplate exist which is not refined
	 * 
	 * @param abstractNodeTemplate - Abstract NodeTemplate which should be refined
	 * @return
	 ******************************************************************************************************************************************************************************************************/
	private boolean existNotRefinedOutRelation(NodeTemplate abstractNodeTemplate) {
		for (RelationshipTemplate abstractRelationshipTemplate : abstractNodeTemplate.getOutRelationshipTemplates()) {
			if (!abstractRelationshipTemplate.isRefined()) {
				return true;
			}
		}
		return false;
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method isCompatibleToPrevRefinement - check if next refinement is compatible to previous Refinement
	 * 
	 * @param sourceNodeQueue-
	 * @param currentEntryNodes
	 * @param isNextRefined
	 * @return
	 ******************************************************************************************************************************************************************************************************/
	private boolean isCompatibleToPrevRefinement(ArrayList<LevelGraphNode> previousExitNodes, ArrayList<LevelGraphNode> currentEntryNodes) {

		// Check if Exit Node is compatible with at least one entry Node and if a Entry Node is compatible with at least one previous exit node
		ArrayList<LevelGraphNode> entryValid = new ArrayList<LevelGraphNode>();
		for (LevelGraphNode prevExit : new ArrayList<LevelGraphNode>(previousExitNodes)) {
			for (LevelGraphRelation outConnectRelation : prevExit.getOutLevelGraphRelations()) {
				if (outConnectRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
					for (LevelGraphNode currentEntry : new ArrayList<LevelGraphNode>(currentEntryNodes)) {
						if (outConnectRelation.getTargetNodeId().equals(currentEntry.getId())) {
							previousExitNodes.remove(prevExit);
							entryValid.add(currentEntry);
						}
					}
				}
			}
		}

		currentEntryNodes.removeAll(entryValid);

		if (previousExitNodes.isEmpty() && currentEntryNodes.isEmpty()) {
			return true;
		} else {
			return false;
		}

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method isCompatibleToNextRefinement - check if the refinement of a target NodeTemplate of a RelationshipTemplate is compatible to the refinement of the RelationshipTemplate
	 * 
	 * @param exitNodes - Exit Nodes of the fragment refinement of the RelationshipTemplate
	 * @param entryNodes - Entry Nodes of the fragment refinement of the target NodeTemplate of the RelationshipTemplate
	 * 
	 * @return
	 ******************************************************************************************************************************************************************************************************/
	private boolean isCompatibleNextRefinement(ArrayList<LevelGraphNode> exitNodes, ArrayList<LevelGraphNode> entryNodes) {
		if (!entryNodes.isEmpty()) {
			return isCompatibleToPrevRefinement(exitNodes, entryNodes);
		} else {
			return true;
		}

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method smiThresholdExceeded - checks if the SMI threshold is reached and the RefineTo relation is a valid refinement
	 * 
	 * @param providedProperties - Provided Properties of the Level Graph Node
	 * @param expectedProperties - Expected Properties abstract NodeTemplate or RelationshipTemplate
	 * @return
	 * 
	 ******************************************************************************************************************************************************************************************************/
	private boolean smiThresholdExceeded(Collection<ProvidedProperty> providedProperties, Collection<ExpectedProperty> expectedProperties) {

		if (expectedProperties.size() == 0) {
			return true;
		}

		int number_of_matches = 0;
		for (ProvidedProperty providedProperty : providedProperties) {
			for (ExpectedProperty expectedProperty : expectedProperties) {
				if (providedProperty.getName().equals(expectedProperty.getName())) {
					if (providedProperty.getValue().equals(expectedProperty.getValue())) {
						number_of_matches++;
					}
				}
			}
		}

		if (smi <= ((float) number_of_matches / (float) expectedProperties.size())) {
			return true;
		}

		return false;
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - isSourceNodeEqualsTargetNodeCheck if the refinement represent a Self-Referenz relation
	 * 
	 * @param sourceNodeTemplates
	 * @param targetNodeId
	 * @return true if source equals target else false
	 ******************************************************************************************************************************************************************************************************/
	private boolean isSourceNodeEqualsTargetNode(ArrayList<NodeTemplate> sourceNodeTemplates, Long targetNodeId) {

		for (NodeTemplate soruceNode : sourceNodeTemplates) {
			if (soruceNode.getLevelGraphNodeId() == targetNodeId) {
				return true;
			}
		}

		return false;
	}
}
