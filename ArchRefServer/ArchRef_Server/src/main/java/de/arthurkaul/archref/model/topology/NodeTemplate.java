package de.arthurkaul.archref.model.topology;

import java.util.ArrayList;
import java.util.List;

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
 * @class - NodeTemplate - A node of a TopologyTemplate
 *
 * @class Entity
 * @superField - Long id - ID of the RelationshipTemplate
 * @superField - String name - Name of the RelationshipTemplate
 * @superField - List<ExpectedProperty> expectedProperties - Array of expected properties of the NodeTemplate
 * @superField - List<ProvidedProperty> providedProperties - Array of provided properties of the NodeTemplate
 *
 * @class Node
 * @superField - Float x - x Position of the left upper corner of a rectangle
 * @superField - Float y - y Position of the left upper corner of a rectangle
 * @superField - Float width - Width of the rectangle
 * @superField - Float height - Height of the rectangle
 *
 * @field - LevelGraphNode levelGraphNode - LevelGraphNode from which the NodeTemplate was created
 * @field - Long levelGraphNodeId: number - ID of the LevelGraphNode from which the NodeTemplate was created
 * @field - NodeType nodeType: NodeType - NodeType of the NodeTemplate
 * @field - Long nodeTypeId: number - ID of NodeType of the NodeTemplate
 * @field - List<RelationshipTemplate> inRelationshipTemplates - Array of all incoming RelationshipTemplates of the NodeTemplate
 * @field - List<RelationshipTemplate> outRelationshipTemplates - Array of all outgoing RelationshipTemplates of the NodeTemplate
 * @field - TopologyTemplate topologyTemplate - TopologyTemplate of the NodeTemplate
 * @field - TopologyTemplate topologyTemplateId - ID of TopologyTemplate of the NodeTemplate
 * @field - Integer abstractionLevel - Level of abstraction of the NodeTemplate
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

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "sourceNodeTemplate")
	@JsonManagedReference(value = "inRelationshipTemplates-sourceNodeTemplate")
	private List<RelationshipTemplate> inRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "targetNodeTemplate")
	@JsonManagedReference(value = "outRelationshipTemplates-targetNodeTemplate")
	private List<RelationshipTemplate> outRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-nodeTemplate")
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

	public NodeType getNodeType() {
		return nodeType;
	}

	public void setNodeType(NodeType nodeType) {
		this.nodeType = nodeType;
	}

	public Long getNodeTypeId() {
		return nodeTypeId;
	}

	public void setNodeTypeId(Long nodeTypeId) {
		this.nodeTypeId = nodeTypeId;
	}

	public List<RelationshipTemplate> getInRelationshipTemplates() {
		return inRelationshipTemplates;
	}

	public void setInRelationshipTemplates(List<RelationshipTemplate> inRelationshipTemplates) {
		this.inRelationshipTemplates = inRelationshipTemplates;
	}

	public List<RelationshipTemplate> getOutRelationshipTemplates() {
		return outRelationshipTemplates;
	}

	public void setOutRelationshipTemplates(List<RelationshipTemplate> outRelationshipTemplates) {
		this.outRelationshipTemplates = outRelationshipTemplates;
	}

	public TopologyTemplate getTopologyTemplate() {
		return topologyTemplate;
	}

	public void setTopologyTemplate(TopologyTemplate topologyTemplate) {
		this.topologyTemplate = topologyTemplate;
	}

	public Integer getAbstractionLevel() {
		return abstractionLevel;
	}

	public void setAbstractionLevel(Integer abstractionLevel) {
		this.abstractionLevel = abstractionLevel;
	}

}
