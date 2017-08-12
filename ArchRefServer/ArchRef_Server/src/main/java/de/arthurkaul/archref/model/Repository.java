package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.model.types.RelationshipType;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Repository> - List of <NodeType> and <RelationshipType> objects
 *
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
public class Repository extends Base {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "NAME")
	@XmlAttribute(name = "name", required = true)
	@NotNull
	private String name;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "repository")
	@Cascade(CascadeType.ALL)
	@JsonManagedReference(value = "repository-nodeType")
	@XmlElementWrapper(name = "NodeTypes")
	@XmlElement(name = "NodeType")
	private List<NodeType> nodeTypes = new ArrayList<NodeType>();

	@OneToMany(mappedBy = "repository")
	@Cascade(CascadeType.ALL)
	@JsonManagedReference(value = "repository-relationshipType")
	@XmlElementWrapper(name = "RelationshipTypes")
	@XmlElement(name = "RelationshipType")
	private List<RelationshipType> relationshipTypes = new ArrayList<RelationshipType>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<NodeType> getNodeTypes() {
		return nodeTypes;
	}

	public void setNodeTypes(List<NodeType> nodeTypes) {
		this.nodeTypes = nodeTypes;
	}

	public List<RelationshipType> getRelationshipTypes() {
		return relationshipTypes;
	}

	public void setRelationshipTypes(List<RelationshipType> relationshipTypes) {
		this.relationshipTypes = relationshipTypes;
	}

}
