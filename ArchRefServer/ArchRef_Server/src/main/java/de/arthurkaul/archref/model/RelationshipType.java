package de.arthurkaul.archref.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class RelationshipType {
	

	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY_ID")
	@JsonBackReference
	private Repository repositoryRelationshipType;
	
	//private NodeType derivedFromNodeType;
	
	@ManyToMany
	@JoinTable(name="RELATIONSHIPTYPE_INSTANCESTATE", joinColumns=@JoinColumn(name="RELATIONSHIPTYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="INSTANCESTATE_ID", referencedColumnName="ID"))
	private Collection<InstanceState> instanceStateList;
	
	@ManyToMany
	@JoinTable(name="RELATIONSHIPTYPE_SOURCEINTERFACE", joinColumns=@JoinColumn(name="RELATIONSHIPTYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="INTERFACE_ID", referencedColumnName="ID"))
	private Collection<Interface> sourceInterfacesList;
	
//	@ManyToMany
//	@JoinTable(name="RELATIONSHIPTYPE_TARGETINTERFACE", joinColumns=@JoinColumn(name="RELATIONSHIPTYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="INTERFACE_ID", referencedColumnName="ID"))
//	private Collection<Interface> targetInterfacesList;
	
//	@OneToMany(mappedBy="repositoryRelationshipType")
//	private Collection<RelationshipTemplate> relationshipTemplateList;

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

	public Repository getRepositoryRelationshipType() {
		return repositoryRelationshipType;
	}

	public void setRepositoryRelationshipType(Repository repositoryRelationshipType) {
		this.repositoryRelationshipType = repositoryRelationshipType;
	}

	public Collection<InstanceState> getInstanceStateList() {
		return instanceStateList;
	}

	public void setInstanceStateList(Collection<InstanceState> instanceStateList) {
		this.instanceStateList = instanceStateList;
	}

	public Collection<Interface> getSourceInterfacesList() {
		return sourceInterfacesList;
	}

	public void setSourceInterfacesList(Collection<Interface> sourceInterfacesList) {
		this.sourceInterfacesList = sourceInterfacesList;
	}

//	public Collection<Interface> getTargetInterfacesList() {
//		return targetInterfacesList;
//	}
//
//	public void setTargetInterfacesList(Collection<Interface> targetInterfacesList) {
//		this.targetInterfacesList = targetInterfacesList;
//	}

//	public Collection<RelationshipTemplate> getRelationshipTemplateList() {
//		return relationshipTemplateList;
//	}
//
//	public void setRelationshipTemplateList(Collection<RelationshipTemplate> relationshipTemplateList) {
//		this.relationshipTemplateList = relationshipTemplateList;
//	}

}
