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
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="REPOSITORY")
public class Repository {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	
	private Long id;
	
	@Column(name="NAME", unique = true)
	@NotNull
	private String name;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
	@JsonManagedReference
	private Collection<NodeType> nodeTypeList;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryRelationshipType")
	@JsonManagedReference
	private Collection<RelationshipType> relationTypeList;
	

//	private ArrayList<RequirementType> requirementTypeList;
//	private ArrayList<Capability> capabilityTypeList;
//	private ArrayList<ArtifactType> artifactTypeList;

	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Repository: [id=%d, name='%s']",
                id, name);
    }

	public Collection<NodeType> getNodeTypeList() {
		return nodeTypeList;
	}

	public void setNodeTypeList(Collection<NodeType> nodeTypeList) {
		this.nodeTypeList = nodeTypeList;
	}

	public Collection<RelationshipType> getRelationTypeList() {
		return relationTypeList;
	}

	public void setRelationTypeList(Collection<RelationshipType> relationTypeList) {
		this.relationTypeList = relationTypeList;
	}
	
}
