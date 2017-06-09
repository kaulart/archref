package de.arthurkaul.archref.model.topology;

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
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;

@Entity
@Table(name="TOPOLOGY_TEMPLATE")
public class TopologyTemplate {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String name;

	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="topologyTemplate")
	@JsonManagedReference (value="topologyTemplate-nodeTemplate")
	private Collection<NodeTemplate> nodeTemplates;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="topologyTemplate")
	@JsonManagedReference (value="topologyTemplate-relationshipTemplate")
	private Collection<RelationshipTemplate> relationshipTemplates;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH_TOPOLOGYTEMPLATE")
	@JsonBackReference (value="levelgraph-topologytemplate")
	private LevelGraph levelGraph;
	
	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;
	
	@Column(name = "ABSTRACTIONLEVEL")
	private Long abstractionLevel;

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

	public LevelGraph getLevelGraph() {
		return levelGraph;
	}

	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}

	public Collection<NodeTemplate> getNodeTemplates() {
		return nodeTemplates;
	}

	public void setNodeTemplates(Collection<NodeTemplate> nodeTemplates) {
		this.nodeTemplates = nodeTemplates;
	}

	public Collection<RelationshipTemplate> getRelationshipTemplates() {
		return relationshipTemplates;
	}

	public void setRelationshipTemplates(Collection<RelationshipTemplate> relationshipTemplates) {
		this.relationshipTemplates = relationshipTemplates;
	}

	public Long getAbstractionLevel() {
		return abstractionLevel;
	}

	public void setAbstractionLevel(Long abstractionLevel) {
		this.abstractionLevel = abstractionLevel;
	}

	public Long getLevelGraphId() {
		return levelGraphId;
	}

	public void setLevelGraphId(Long levelGraphId) {
		this.levelGraphId = levelGraphId;
	}
	
}
