package de.arthurkaul.archref.model.node;

import java.net.URI;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import de.arthurkaul.archref.model.Repository;

@Entity
public class NodeType {
		
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
//	private NodeType derivedFromNodeType;
//	
//	private URI targetNamespace;
//	
//	private boolean abstractNodeType;
//	
//	private boolean finalNodeType;
	
//	@ManyToMany
//	@JoinTable(name="NODETYPE_REQUIREMENTDEFINITION", joinColumns=@JoinColumn(name="NODETYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="REQUIREMENT_ID", referencedColumnName="ID"))
//	private Collection<RequirementDefinition> RequirementDefinitionList;
//	
//	@ManyToMany
//	@JoinTable(name="NODETYPE_CAPABILITYDEFINITION", joinColumns=@JoinColumn(name="NODETYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="CAPABILITY_ID", referencedColumnName="ID"))
//	private Collection<CapabilityDefinition> capabilityDefinitionList;
//	
//	@ManyToMany
//	@JoinTable(name="NODETYPE_INSTANCESTATE", joinColumns=@JoinColumn(name="NODETYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="INSTANCESTATE_ID", referencedColumnName="ID"))
//	private Collection<InstanceState> instanceStateList;
//	
//	@ManyToMany
//	@JoinTable(name="NODETYPE_INTERFACE", joinColumns=@JoinColumn(name="NODETYPE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="INTERFACE_ID", referencedColumnName="ID"))
//	private Collection<Interface> interfacesList;
//	
//	@OneToMany(mappedBy="nodeType")
//	private Collection<NodeTemplate> nodeTemplateList;
	
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
//	public void setDerivedFromNodeType(NodeType derivedFromNodeType) {
//		this.derivedFromNodeType = derivedFromNodeType;
//	}

	public Repository getRepositoryNodeType() {
		return repositoryNodeType;
	}

	public void setRepositoryNodeType(Repository repositoryNodeType) {
		
	        this.repositoryNodeType = repositoryNodeType;
	     
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
