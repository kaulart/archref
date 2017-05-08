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
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

}
