package de.arthurkaul.archref.model.topologyTemplate;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import de.arthurkaul.archref.model.Repository;

@Entity
@Table(name="TOPOLOGY_TEMPLATE")
public class TopologyTemplate {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String name;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY_ID")
	private Repository repository;
	
	
	@OneToMany (mappedBy="topologyTemplate")
	private Collection<NodeTemplate> nodeTemplateList;
	
	@OneToMany (mappedBy="topologyTemplate")
	private Collection<RelationshipTemplate> relationshipTemplateList;

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
	
}
