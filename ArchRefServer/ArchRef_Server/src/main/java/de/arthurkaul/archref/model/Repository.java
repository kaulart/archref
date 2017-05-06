package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="REPOSITORY")
public class Repository {
	
	@Id
	@GeneratedValue()
	@Column(name="REP_ID")
	private Long id;
	
	@Column(name="NAME", unique = true)
	@NotNull
	private String name;
	
	
//	private ArrayList<TopologyTemplate> topologyTemplateList; 
	
//	@OneToMany (mappedBy="repository")
//	private Collection<NodeType> nodeTypeList;
//	
//	@OneToMany (mappedBy="repository")
//	private Collection<RelationshipType> relationTypeList;
	
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
	
}
