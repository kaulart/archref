package de.arthurkaul.archref.model.topologyTemplate;

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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.model.interfaces.Interface;

@Entity
@Table(name="RELATIONSHIPTYPE")
public class RelationshipType{
	

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
