package de.arthurkaul.archref.model.topology;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import de.arthurkaul.archref.model.graph.Relation;
import de.arthurkaul.archref.model.types.RelationshipType;

@Entity
@Table(name="RELATIONSHIPTEMPLATE")
public class RelationshipTemplate extends Relation {
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="RELATIONSHIPTYPE")
	private RelationshipType relationshipType;
	
	@Column(name = "RELATIONSHIPTYPE_ID")
	private Long relationshipTypeId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOURCENODETEMPLATE")
	@JsonBackReference(value = "outRelationsipTemplates-sourceNodeTemplate")
	private NodeTemplate sourceNodeTemplate;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TARGETNODETEMPLATE")
	@JsonBackReference(value="inRelationshipTemplates-targetNodeTemplate")
	private NodeTemplate targetNodeTemplate;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TOPOLOGYTEMPLATE")
	@JsonBackReference(value="topologyTemplate-relationshipTemplate")
	private TopologyTemplate topologyTemplate;
	
	@Column(name = "TOPOLOGYTEMPLATE_ID")
	private Long topologyTemplateId;

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setNodeType(RelationshipType relationshipType) {
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
	
}
