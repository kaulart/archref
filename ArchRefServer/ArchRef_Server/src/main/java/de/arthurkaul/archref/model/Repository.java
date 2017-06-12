package de.arthurkaul.archref.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.model.types.RelationshipType;

@Entity
@Table(name = "REPOSITORY")
public class Repository {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "repository")
	@JsonManagedReference(value = "repository-nodeType")
	private Collection<NodeType> nodeTypeList;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "repository")
	@JsonManagedReference(value = "repository-relationshipType")
	private Collection<RelationshipType> relationshipTypeList;

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
	
	public Collection<NodeType> getNodeTypeList() {
		return nodeTypeList;
	}

	public void setNodeTypeList(Collection<NodeType> nodeTypeList) {
		this.nodeTypeList = nodeTypeList;
	}

	public Collection<RelationshipType> getRelationshipTypeList() {
		return relationshipTypeList;
	}

	public void setRelationshipTypeList(Collection<RelationshipType> relationshipTypeList) {
		this.relationshipTypeList = relationshipTypeList;
	}

}
