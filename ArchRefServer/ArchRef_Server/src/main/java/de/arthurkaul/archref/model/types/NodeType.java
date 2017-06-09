package de.arthurkaul.archref.model.types;

import java.util.Collection;

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
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Property;
import de.arthurkaul.archref.model.Repository;

@Entity
@Table(name="NODETYPE")
public class NodeType{
		
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@Column(name="ICON_PATH")
	@NotNull
	private String icon;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="nodeType")
	@JsonManagedReference (value="nodeType-property")
	private Collection<Property> providedProperties;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY_ID")
	@JsonBackReference
	private Repository repositoryNodeType;
	
	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
//	public NodeType getDerivedFromNodeType() {
//		return derivedFromNodeType;
//	}
//	
//	public void setDerivedFromNodeType(NodeType derivedFromNodeType) {
//		this.derivedFromNodeType = derivedFromNodeType;
//	}

	public Repository getRepositoryNodeType() {
		return repositoryNodeType;
	}

	public void setRepositoryNodeType(Repository repositoryNodeType) {
		
	        this.repositoryNodeType = repositoryNodeType;
	     
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Collection<Property> getProvidedProperties() {
		return providedProperties;
	}

	public void setProvidedProperties(Collection<Property> providedProperties) {
		this.providedProperties = providedProperties;
	}

//	public NodeType getDerivedFromNodeType() {
//		return derivedFromNodeType;
//	}
//
//	public void setDerivedFromNodeType(NodeType derivedFromNodeType) {
//		this.derivedFromNodeType = derivedFromNodeType;
//	}
//
//	public URI getTargetNamespace() {
//		return targetNamespace;
//	}
//
//	public void setTargetNamespace(URI targetNamespace) {
//		this.targetNamespace = targetNamespace;
//	}
//
//	public boolean isAbstractNodeType() {
//		return abstractNodeType;
//	}
//
//	public void setAbstractNodeType(boolean abstractNodeType) {
//		this.abstractNodeType = abstractNodeType;
//	}
//
//	public boolean isFinalNodeType() {
//		return finalNodeType;
//	}
//
//	public void setFinalNodeType(boolean finalNodeType) {
//		this.finalNodeType = finalNodeType;
//	}

}
