package de.arthurkaul.archref.model.topology;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.types.NodeType;

/*******************************************************************************************************************************************************************************************************
 *
 * @data - NodeTemplate Data Model - A node of a TopologyTemplate
 *
 * @Entity
 * @superFields - id: number - ID of the NodeTemplate
 * @superFields - name: string - Name of the NodeTemplate
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the NodeTemplate
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the NodeTemplate
 *
 * @Node
 * @superFields - x: number - x Position of the left upper corner of a rectangle
 * @superFields - y: number - y Position of the left upper corner of a rectangle
 * @superFields - width: number - Width of the rectangle
 * @superFields - height: number - Height of the rectangle
 *
 * @fields - levelGraphNode: LevelGraphNode - LevelGraphNode from which the NodeTemplate was created
 * @fields - levelGraphNodeId: number - ID of the LevelGraphNode from which the NodeTemplate was created
 * @fields - nodeType: NodeType - NodeType of the NodeTemplate
 * @fields - nodeTypeId: number - ID of NodeType of the NodeTemplate
 * @fields - inRelationshipTemplates: RelationshipTemplate[] - Array of all incoming RelationshipTemplates of the NodeTemplate
 * @fields - outRelationshipTemplates: RelationshipTemplate[] - Array of all outgoing RelationshipTemplates of the NodeTemplate
 * @fields - topologyTemplate: TopologyTemplate - TopologyTemplate of the NodeTemplate
 * @fields - topologyTemplateId: number - ID of TopologyTemplate of the NodeTemplate
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "NODETEMPLATE")
public class NodeTemplate extends Node {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPHNODE")
	@JsonBackReference(value = "levelGraphNode-nodeTemplate")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	private Long levelGraphNodeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NODETYPE")
	@JsonBackReference(value = "nodeType-nodeTemplate")
	private NodeType nodeType;

	@Column(name = "NODETYPE_ID")
	private Long nodeTypeId;

	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "sourceNodeTemplate")
	@JsonManagedReference(value = "inRelationshipTemplates-sourceNodeTemplate")
	private Collection<RelationshipTemplate> inRelationshipTemplates;
	
	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "targetNodeTemplate")
	@JsonManagedReference(value = "outRelationshipTemplates-targetNodeTemplate")
	private Collection<RelationshipTemplate> outRelationshipTemplates;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-nodeTemplate")
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

	public Collection<RelationshipTemplate> getInRelationshipTemplates() {
		return inRelationshipTemplates;
	}

	public void setInRelationshipTemplates(Collection<RelationshipTemplate> inRelationshipTemplates) {
		this.inRelationshipTemplates = inRelationshipTemplates;
	}

	public Collection<RelationshipTemplate> getOutRelationshipTemplates() {
		return outRelationshipTemplates;
	}

	public void setOutRelationshipTemplates(Collection<RelationshipTemplate> outRelationshipTemplates) {
		this.outRelationshipTemplates = outRelationshipTemplates;
	}

}
