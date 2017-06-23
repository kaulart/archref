package de.arthurkaul.archref.model.topology;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - TopologyTemplate - TopologyTemplate Model is used for model a abstract or specific system architecture
 *
 * @field - Long id - ID of the TopologyTemplate
 * @field - String name - Name of the TopologyTemplate
 * @field - List<NodeTemplate> nodeTemplates - Collection of all NodeTemplates in the LevelGraph
 * @field - List<RelationshipTemplate> relationshipTemplates - Collection of all RelationshipTemplates in the LevelGraph
 * @field - TopologyTemplate parentTopologyTemplate - Parent of the TopologyTemplate from which it was derived
 * @field - Long parentTopologyTemplateId - ID of the parent of the topology
 * @field - Collection<TopologyTemplate> childTopologyTemplates - Collection of child of the TopologyTemplate. Child are all TopologyTemplate which are generated through the refinement from this
 *        topology
 * @field - Integer abstractionLevel - Level is calculated from the Root Topology
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "TOPOLOGYTEMPLATE")
public class TopologyTemplate {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "topologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-nodeTemplate")
	private List<NodeTemplate> nodeTemplates = new ArrayList<NodeTemplate>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "topologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-relationshipTemplate")
	private List<RelationshipTemplate> relationshipTemplates = new ArrayList<RelationshipTemplate>();

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PARENT_TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-topologyTemplate")
	private TopologyTemplate parentTopologyTemplate;

	@Column(name = "PARENT_TOPOLOGYTEMPLATE_ID")
	private Long parentTopologyTemplateID;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parentTopologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-topologyTemplate")
	private List<TopologyTemplate> childTopologyTemplates = new ArrayList<TopologyTemplate>();

	@Column(name = "ABSTRACTION_LEVEL")
	private int abstractionLevel = 0;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<NodeTemplate> getNodeTemplates() {
		return nodeTemplates;
	}

	public void setNodeTemplates(ArrayList<NodeTemplate> nodeTemplates) {
		this.nodeTemplates = nodeTemplates;
	}

	public List<RelationshipTemplate> getRelationshipTemplates() {
		return relationshipTemplates;
	}

	public void setRelationshipTemplates(ArrayList<RelationshipTemplate> relationshipTemplates) {
		this.relationshipTemplates = relationshipTemplates;
	}

	public TopologyTemplate getParentTopologyTemplate() {
		return parentTopologyTemplate;
	}

	public void setParentTopologyTemplate(TopologyTemplate parentTopologyTemplate) {
		this.parentTopologyTemplate = parentTopologyTemplate;
	}

	public Long getParentTopologyTemplateID() {
		return parentTopologyTemplateID;
	}

	public void setParentTopologyTemplateID(Long parentTopologyTemplateID) {
		this.parentTopologyTemplateID = parentTopologyTemplateID;
	}

	public List<TopologyTemplate> getChildTopologyTemplates() {
		return childTopologyTemplates;
	}

	public void setChildTopologyTemplates(ArrayList<TopologyTemplate> childTopologyTemplates) {
		this.childTopologyTemplates = childTopologyTemplates;
	}

	public int getAbstractionLevel() {
		return abstractionLevel;
	}

	public void setAbstractionLevel(int abstractionLevel) {
		this.abstractionLevel = abstractionLevel;
	}

}
