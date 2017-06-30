package de.arthurkaul.archref.model.topology;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.model.types.RelationshipType;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - RelationshipTemplate - A relation between two NodeTemplates
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
	@XmlInverseReference(mappedBy = "relationshipTemplates")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	@XmlAttribute(name = "levelGraphNodeId")
	private Long levelGraphNodeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RELATIONSHIPTYPE")
	@JsonBackReference(value = "relationshipType-relationshipTemplate")
	@XmlInverseReference(mappedBy = "relationshipTemplates")
	private RelationshipType relationshipType;

	@Column(name = "RELATIONSHIPTYPE_ID")
	@XmlAttribute(name = "relationshipTypeId")
	private Long relationshipTypeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_NODETEMPLATE", updatable = false)
	@JsonBackReference(value = "outRelationshipTemplates-sourceNodeTemplate")
	@XmlElement(name = "SourceNodeTemplate")
	private NodeTemplate sourceNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_NODETEMPLATE", updatable = false)
	@JsonBackReference(value = "inRelationshipTemplates-targetNodeTemplate")
	@XmlElement(name = "TargetNodeTemplate")
	private NodeTemplate targetNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-relationshipTemplate")
	@XmlInverseReference(mappedBy = "relationshipTemplates")
	private TopologyTemplate topologyTemplate;

	@Column(name = "TOPOLOGYTEMPLATE_ID")
	@XmlAttribute(name = "topologyTemplateId")
	private Long topologyTemplateId;

	@Column(name = "ABSTRACTION_LEVEL")
	@XmlAttribute(name = "abstractionLevelDepth")
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

	public RelationshipTemplate clone(TopologyTemplate topologyTemplate, NodeTemplate sourceNodeTemplate, NodeTemplate targetNodeTemplate) {
		RelationshipTemplate relationshipTemplate = new RelationshipTemplate();
		relationshipTemplate.setAbstractionLevel(this.abstractionLevel);
		relationshipTemplate.setName(this.getName());
		relationshipTemplate.setPath(this.getPath().clone());
		relationshipTemplate.setSourceNodeId(sourceNodeTemplate.getId());
		relationshipTemplate.setSourceNodeTemplate(sourceNodeTemplate);
		relationshipTemplate.setTargetNodeId(targetNodeTemplate.getId());
		relationshipTemplate.setTargetNodeTemplate(targetNodeTemplate);
		relationshipTemplate.setIcon(this.getIcon());

		relationshipTemplate.setLevelGraphNode(this.levelGraphNode);
		relationshipTemplate.setLevelGraphNodeId(this.getLevelGraphNodeId());
		relationshipTemplate.setRelationshipType(this.relationshipType);
		relationshipTemplate.setRelationshipTypeId(this.relationshipTypeId);

		relationshipTemplate.setTopologyTemplate(topologyTemplate);
		relationshipTemplate.setTopologyTemplateId(topologyTemplate.getId());

		for (ExpectedProperty property : this.getExpectedProperties()) {
			relationshipTemplate.getExpectedProperties().add(property.clone());
		}
		for (ProvidedProperty property : this.getProvidedProperties()) {
			relationshipTemplate.getProvidedProperties().add(property.clone());
		}

		return relationshipTemplate;
	}

	public void updateForeignKey() {
		this.setTopologyTemplateId(this.topologyTemplate.getId());
		this.setSourceNodeId(this.getSourceNodeTemplate().getId());
		this.setTargetNodeId(this.getTargetNodeTemplate().getId());

	}

}
