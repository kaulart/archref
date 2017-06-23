package de.arthurkaul.archref.model.topology;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.types.RelationshipType;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - RelationshipTemplate - A relation between two NodeTemplates
 *
 * @class Entity
 * @superField - Long id - ID of the RelationshipTemplate
 * @superField - String name - Name of the RelationshipTemplate
 * @superField - List<ExpectedProperty> expectedProperties - Array of expected properties of the RelationshipTemplate
 * @superField - List<ProvidedProperty> providedProperties - Array of provided properties of the RelationshipTemplate
 *
 * @class Relation
 * @superField - Long sourceNodeId - ID of the Source Node of RelationshipTemplate
 * @superField - Long targetNodeId - ID of the Target Node of RelationshipTemplate
 * @superField - Path path - Path of the line from source node to target node
 *
 * @field - LevelGraphNode levelGraphNode - LevelGraph Node from which this RelationshipTemplate is derived
 * @field - Long levelGraphNodeId - ID of the LevelGraph Node form which the RelationshipTemplate is derived
 * @field - RelationshipType relationshipType - RelationshipType of the RelationshipTemplate
 * @field - Long relationshipTypeId - ID of the RelationshipType
 * @field - NodeTemplate sourceNodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @field - NodeTemplate targetNodeTemplate - Source and Target NodeTemplate of the RelationshipTemplate
 * @field - TopologyTemplate topologyTemplate - TopologyTemplate of the RelationshipTemplate
 * @field - Long topologyTemplateId - ID of the TopologyTemplate
 * @field - Integer abstractionLevel - Level of abstraction of the RelationshipTemplate
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "RELATIONSHIPTEMPLATE")
public class RelationshipTemplate extends Relation {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPHNODE")
	@JsonBackReference(value = "levelGraphNode-relationshipTemplates")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	private Long levelGraphNodeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RELATIONSHIPTYPE")
	@JsonBackReference(value = "relationshipType-relationshipTemplate")
	private RelationshipType relationshipType;

	@Column(name = "RELATIONSHIPTYPE_ID")
	private Long relationshipTypeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_NODETEMPLATE")
	@JsonBackReference(value = "inRelationshipTemplates-sourceNodeTemplate")
	// @Cascade({ CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH })
	private NodeTemplate sourceNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_NODETEMPLATE")
	@JsonBackReference(value = "outRelationshipTemplates-targetNodeTemplate")
	// @Cascade({ CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH })
	private NodeTemplate targetNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-relationshipTemplate")
	private TopologyTemplate topologyTemplate;

	@Column(name = "TOPOLOGYTEMPLATE_ID")
	private Long topologyTemplateId;

	@Column(name = "ABSTRACTION_LEVEL")
	private Integer abstractionLevel;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public LevelGraphNode getLevelGraphNode() {
		return levelGraphNode;
	}

	public void setLevelGraphNode(LevelGraphNode levelGraphNode) {
		this.levelGraphNode = levelGraphNode;
	}

	public Long getLevelGraphNodeId() {
		return levelGraphNodeId;
	}

	public void setLevelGraphNodeId(Long levelGraphNodeId) {
		this.levelGraphNodeId = levelGraphNodeId;
	}

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setRelationshipType(RelationshipType relationshipType) {
		this.relationshipType = relationshipType;
	}

	public Long getRelationshipTypeId() {
		return relationshipTypeId;
	}

	public void setRelationshipTypeId(Long relationshipTypeId) {
		this.relationshipTypeId = relationshipTypeId;
	}

	public NodeTemplate getSourceNodeTemplate() {
		return sourceNodeTemplate;
	}

	public void setSourceNodeTemplate(NodeTemplate sourceNodeTemplate) {
		this.sourceNodeTemplate = sourceNodeTemplate;
	}

	public NodeTemplate getTargetNodeTemplate() {
		return targetNodeTemplate;
	}

	public void setTargetNodeTemplate(NodeTemplate targetNodeTemplate) {
		this.targetNodeTemplate = targetNodeTemplate;
	}

	public TopologyTemplate getTopologyTemplate() {
		return topologyTemplate;
	}

	public void setTopologyTemplate(TopologyTemplate topologyTemplate) {
		this.topologyTemplate = topologyTemplate;
	}

	public Long getTopologyTemplateId() {
		return topologyTemplateId;
	}

	public void setTopologyTemplateId(Long topologyTemplateId) {
		this.topologyTemplateId = topologyTemplateId;
	}

	public Integer getAbstractionLevel() {
		return abstractionLevel;
	}

	public void setAbstractionLevel(Integer abstractionLevel) {
		this.abstractionLevel = abstractionLevel;
	}

}
