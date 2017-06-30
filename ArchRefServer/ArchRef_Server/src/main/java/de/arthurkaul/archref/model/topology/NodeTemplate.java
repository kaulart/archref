package de.arthurkaul.archref.model.topology;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.model.types.NodeType;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - NodeTemplate - A node of a TopologyTemplate. Inherited the <Node> class.
 *
 * @field - <LevelGraphNode> levelGraphNode - LevelGraphNode from which the NodeTemplate was created
 * @field - Long levelGraphNodeId: number - ID of the LevelGraphNode from which the NodeTemplate was created
 * @field - <NodeType> nodeType: NodeType - NodeType of the NodeTemplate
 * @field - Long nodeTypeId: number - ID of NodeType of the NodeTemplate
 * @field - List<RelationshipTemplate> inRelationshipTemplates - Array of all incoming RelationshipTemplates of the NodeTemplate
 * @field - List<RelationshipTemplate> outRelationshipTemplates - Array of all outgoing RelationshipTemplates of the NodeTemplate
 * @field - <TopologyTemplate> topologyTemplate - TopologyTemplate of the NodeTemplate
 * @field - <TopologyTemplate> topologyTemplateId - ID of TopologyTemplate of the NodeTemplate
 * @field - Integer abstractionLevel - Level of abstraction of the NodeTemplate
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "NODETEMPLATE")
@XmlRootElement(name = "NodeTemplate")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tNodeTemplate")
public class NodeTemplate extends Node {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPHNODE")
	@JsonBackReference(value = "levelGraphNode-nodeTemplate")
	@XmlInverseReference(mappedBy = "nodeTemplates")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	@XmlAttribute(name = "levelGraphNodeId")
	private Long levelGraphNodeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NODETYPE")
	@JsonBackReference(value = "nodeType-nodeTemplate")
	@XmlInverseReference(mappedBy = "nodeTemplates")
	private NodeType nodeType;

	@Column(name = "NODETYPE_ID")
	@XmlAttribute(name = "nodeTypeId")
	private Long nodeTypeId;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "targetNodeTemplate")
	@JsonManagedReference(value = "inRelationshipTemplates-targetNodeTemplate")
	@XmlInverseReference(mappedBy = "targetNodeTemplate")
	@Cascade({ CascadeType.REMOVE, CascadeType.REFRESH })
	private List<RelationshipTemplate> inRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "sourceNodeTemplate")
	@JsonManagedReference(value = "outRelationshipTemplates-sourceNodeTemplate")
	@XmlInverseReference(mappedBy = "sourceNodeTemplate")
	@Cascade({ CascadeType.REMOVE, CascadeType.REFRESH })
	private List<RelationshipTemplate> outRelationshipTemplates = new ArrayList<RelationshipTemplate>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE", updatable = false)
	@JsonBackReference(value = "topologyTemplate-nodeTemplate")
	@XmlInverseReference(mappedBy = "nodeTemplates")
	private TopologyTemplate topologyTemplate;

	@Column(name = "TOPOLOGYTEMPLATE_ID")
	@XmlAttribute(name = "topologyTemplateId")
	private Long topologyTemplateId;

	@Column(name = "ABSTRACTION_LEVEL")
	@XmlAttribute(name = "abstractionLevelDepth")
	private Integer abstractionLevel;

	@Transient
	private NodeTemplate specificTempNodeTemplate;

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

	@JsonIgnore
	public NodeType getNodeType() {
		return nodeType;
	}

	@JsonIgnore
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

	public Long getTopologyTemplateId() {
		return topologyTemplateId;
	}

	public void setTopologyTemplateId(Long topologyTemplateId) {
		this.topologyTemplateId = topologyTemplateId;
	}

	public NodeTemplate clone(TopologyTemplate topologyTemplate) {
		NodeTemplate nodeTemplate = new NodeTemplate();
		nodeTemplate.setAbstractionLevel(this.abstractionLevel);
		nodeTemplate.setName(this.getName());
		nodeTemplate.setHeight(this.getHeight());
		nodeTemplate.setWidth(this.getWidth());
		nodeTemplate.setY(this.getY());
		nodeTemplate.setX(this.getX());
		nodeTemplate.setIcon(this.getIcon());
		nodeTemplate.setTempId(this.getTempId());
		nodeTemplate.setLevelGraphNode(this.levelGraphNode);
		nodeTemplate.setLevelGraphNodeId(this.getLevelGraphNodeId());
		nodeTemplate.setNodeType(this.nodeType);
		nodeTemplate.setNodeTypeId(this.nodeTypeId);

		nodeTemplate.setTopologyTemplate(topologyTemplate);
		nodeTemplate.setTopologyTemplateId(topologyTemplate.getId());

		for (ExpectedProperty property : this.getExpectedProperties()) {
			nodeTemplate.getExpectedProperties().add(property.clone());
		}
		for (ProvidedProperty property : this.getProvidedProperties()) {
			nodeTemplate.getProvidedProperties().add(property.clone());
		}

		return nodeTemplate;
	}

	@JsonIgnore
	public NodeTemplate getSpecificTempNodeTemplate() {
		return specificTempNodeTemplate;
	}

	@JsonIgnore
	public void setSpecificTempNodeTemplate(NodeTemplate specificTempNodeTemplate) {
		this.specificTempNodeTemplate = specificTempNodeTemplate;
	}

	public void updateForeignKey() {
		this.setTopologyTemplateId(this.topologyTemplate.getId());
	}

}
