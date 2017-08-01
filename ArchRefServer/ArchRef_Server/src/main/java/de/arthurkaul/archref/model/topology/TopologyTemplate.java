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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlIDExtension;
import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Constants;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - TopologyTemplate - TopologyTemplate Model is used for model a abstract or specific system architecture
 *
 * @field - Long id - ID of the TopologyTemplate
 * @field - String name - Name of the TopologyTemplate
 * @field - List<NodeTemplate> nodeTemplates - Collection of all NodeTemplates in the LevelGraph
 * @field - List<RelationshipTemplate> relationshipTemplates - Collection of all RelationshipTemplates in the LevelGraph
 * @field - <TopologyTemplate> parentTopologyTemplate - Parent of the TopologyTemplate from which it was derived
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
@XmlRootElement(name = "TopologyTemplate")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tTopologyTemplate")
public class TopologyTemplate {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	@Id
	@GeneratedValue()
	@Column(name = "ID")
	@XmlAttribute(name = "id")
	@XmlIDExtension
	private Long id;

	@Column(name = "NAME")
	@XmlAttribute(name = "name")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "topologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-nodeTemplate")
	@XmlElementWrapper(name = "NodeTemplates")
	@XmlElement(name = "NodeTemplate")
	private List<NodeTemplate> nodeTemplates = new ArrayList<NodeTemplate>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "topologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-relationshipTemplate")
	@XmlElementWrapper(name = "RelationshipTemplates")
	@XmlElement(name = "RelationshipTemplate")
	private List<RelationshipTemplate> relationshipTemplates = new ArrayList<RelationshipTemplate>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PARENT_TOPOLOGYTEMPLATE", updatable = false)
	@JsonBackReference(value = "topologyTemplate-topologyTemplate")
	@XmlInverseReference(mappedBy = "childTopologyTemplates")
	private TopologyTemplate parentTopologyTemplate;

	@Column(name = "PARENT_TOPOLOGYTEMPLATE_ID")
	private Long parentTopologyTemplateId;

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY, mappedBy = "parentTopologyTemplate")
	@JsonManagedReference(value = "topologyTemplate-topologyTemplate")
	@XmlElementWrapper(name = "ChildTopologyTemplates")
	@XmlElement(name = "TopologyTemplate")
	private List<TopologyTemplate> childTopologyTemplates = new ArrayList<TopologyTemplate>();

	@Column(name = "ABSTRACTION_LEVEL")
	@XmlAttribute(name = "abstractionLevelDepth")
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

	public Long getParentTopologyTemplateId() {
		return parentTopologyTemplateId;
	}

	public void setParentTopologyTemplateId(Long parentTopologyTemplateId) {
		this.parentTopologyTemplateId = parentTopologyTemplateId;
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

	public TopologyTemplate clone() {
		TopologyTemplate topologyTemplate = new TopologyTemplate();
		topologyTemplate.setAbstractionLevel(this.abstractionLevel);
		topologyTemplate.setName(this.name);
		topologyTemplate.setParentTopologyTemplate(this.parentTopologyTemplate);
		topologyTemplate.setParentTopologyTemplateId(this.parentTopologyTemplateId);

		for (NodeTemplate node : this.nodeTemplates) {
			topologyTemplate.getNodeTemplates().add(node.clone(topologyTemplate));
		}

		for (RelationshipTemplate relation : this.relationshipTemplates) {
			NodeTemplate sourceNode = new NodeTemplate();
			NodeTemplate targetNode = new NodeTemplate();

			for (int i = 0; i < topologyTemplate.getNodeTemplates().size(); i++) {
				System.out.println(topologyTemplate.getNodeTemplates().get(i).getTempId() + " == " + relation.getSourceNodeId());
				if (topologyTemplate.getNodeTemplates().get(i).getTempId() == relation.getSourceNodeId()) {
					sourceNode = topologyTemplate.getNodeTemplates().get(i);
				}
				System.out.println(topologyTemplate.getNodeTemplates().get(i).getTempId() + " == " + relation.getTargetNodeId());
				if (topologyTemplate.getNodeTemplates().get(i).getTempId() == relation.getTargetNodeId()) {
					targetNode = topologyTemplate.getNodeTemplates().get(i);
				}
			}
			topologyTemplate.getRelationshipTemplates().add(relation.clone(topologyTemplate, sourceNode, targetNode));
		}

		return topologyTemplate;
	}

	public void updateForeignKey() {

		for (NodeTemplate node : this.nodeTemplates) {
			node.updateForeignKey();
		}

		for (RelationshipTemplate relation : this.relationshipTemplates) {
			relation.updateForeignKey();
		}
	}

	public void updatePosition() {
		System.out.println("Test");

		int fieldsWidthHeight = (int) Math.sqrt(this.getNodeTemplates().size());
		int count = 0;
		// System.out.println("Test:" + fieldsWidthHeight);

		for (int i = 0; i <= fieldsWidthHeight; i++) {
			for (int j = 0; j <= fieldsWidthHeight; j++) {
				// System.out.println("Size:" + this.getNodeTemplates().size());

				if (count < this.getNodeTemplates().size()) {

					float x = i * this.getNodeTemplates().get(count).getWidth() + i * Constants.NODEWIDTH;
					float y = j * this.getNodeTemplates().get(count).getHeight() + j * Constants.NODEHEIGHT;

					// System.out.println("X:" + x);
					// System.out.println("Y:" + y);

					this.getNodeTemplates().get(count).setX(x);
					this.getNodeTemplates().get(count).setY(y);

					for (int k = 0; k < this.getNodeTemplates().get(count).getOutRelationshipTemplates().size(); k++) {
						this.getNodeTemplates().get(count).getOutRelationshipTemplates().get(k).getPath().getPoints().get(0).setX(x);
						this.getNodeTemplates().get(count).getOutRelationshipTemplates().get(k).getPath().getPoints().get(0).setY(y);
						this.getNodeTemplates().get(count).getOutRelationshipTemplates().get(k).getPath().updatePath();
					}

					for (int k = 0; k < this.getNodeTemplates().get(count).getInRelationshipTemplates().size(); k++) {
						this.getNodeTemplates().get(count).getInRelationshipTemplates().get(k).getPath().getPoints().get(1).setX(x);
						this.getNodeTemplates().get(count).getInRelationshipTemplates().get(k).getPath().getPoints().get(1).setY(y);
						this.getNodeTemplates().get(count).getInRelationshipTemplates().get(k).getPath().updatePath();

					}

					count++;
				}

			}
		}

	}

}
