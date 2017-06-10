package de.arthurkaul.archref.model.topology;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.types.NodeType;

@Entity
@Table(name = "NODETEMPLATE")
public class NodeTemplate extends Node{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NODETYPE")
	private NodeType nodeType;

	@Column(name = "NODETYPE_ID")
	private Long nodeTypeId;
	
	@OneToMany (fetch=FetchType.LAZY, mappedBy="targetNodeTemplate")
    @Cascade(CascadeType.ALL)
	@JsonManagedReference (value="inRelationshipTemplates-targetNodeTemplate")
	private Collection<RelationshipTemplate> inRelationshipTemplates;

	@OneToMany (fetch = FetchType.LAZY, mappedBy = "sourceNodeTemplate")
	@Cascade( CascadeType.ALL )
	@JsonManagedReference(value = "outRelationsipTemplates-sourceNodeTemplate")
	private Collection<RelationshipTemplate> outRelationsipTemplates;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value="topologyTemplate-nodeTemplate")
	private TopologyTemplate topologyTemplate;

	@Column(name = "TOPOLOGYTEMPLATE_ID")
	private Long topologyTemplateId;
	
	public NodeType getNodeType() {
		return nodeType;
	}

	public void setNodeType(NodeType nodeType) {
		this.nodeType = nodeType;
	}

	public Long getTopologyTemplateId() {
		return topologyTemplateId;
	}

	public void setTopologyTemplateId(Long topologyTemplateId) {
		this.topologyTemplateId = topologyTemplateId;
	}

	public TopologyTemplate getTopologyTemplate() {
		return topologyTemplate;
	}

	public void setTopologyTemplate(TopologyTemplate topologyTemplate) {
		this.topologyTemplate = topologyTemplate;
	}

	public Long getNodeTypeId() {
		return nodeTypeId;
	}

	public void setNodeTypeId(Long nodeTypeId) {
		this.nodeTypeId = nodeTypeId;
	}

	public Collection<RelationshipTemplate> getInRelationshipTemplates() {
		return inRelationshipTemplates;
	}

	public void setInRelationshipTemplates(Collection<RelationshipTemplate> inRelationshipTemplates) {
		this.inRelationshipTemplates = inRelationshipTemplates;
	}

	public Collection<RelationshipTemplate> getOutRelationsipTemplates() {
		return outRelationsipTemplates;
	}

	public void setOutRelationsipTemplates(Collection<RelationshipTemplate> outRelationsipTemplates) {
		this.outRelationsipTemplates = outRelationsipTemplates;
	}

}
