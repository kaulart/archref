package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.model.types.RelationshipType;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Repository> - List of <NodeType> and <RelationshipType> objects
 *
 * @field - Long id: number - ID of the Repository
 * @field - String name: name - Name of the Repository
 * @field - List<NodeType> nodeTypeList - List of the NodeTypes in the Repository
 * @field - List<RelationshipType> relationshipType - List of the RelationshipTypes in the Repository
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "REPOSITORY")
@XmlRootElement(name = "Repository")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tRepository")
public class Repository {

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

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY, mappedBy = "repository")
	@JsonManagedReference(value = "repository-nodeType")
	@XmlElementWrapper(name = "NodeTypes")
	@XmlElement(name = "NodeType")
	private List<NodeType> nodeTypeList = new ArrayList<NodeType>();

	@OneToMany(cascade = { CascadeType.ALL }, mappedBy = "repository")
	@JsonManagedReference(value = "repository-relationshipType")
	@XmlElementWrapper(name = "RelationshipTypes")
	@XmlElement(name = "RelationshipType")
	private List<RelationshipType> relationshipTypeList = new ArrayList<RelationshipType>();

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

	public List<NodeType> getNodeTypeList() {
		return nodeTypeList;
	}

	public void setNodeTypeList(List<NodeType> nodeTypeList) {
		this.nodeTypeList = nodeTypeList;
	}

	public List<RelationshipType> getRelationshipTypeList() {
		return relationshipTypeList;
	}

	public void setRelationshipTypeList(List<RelationshipType> relationshipTypeList) {
		this.relationshipTypeList = relationshipTypeList;
	}

}
