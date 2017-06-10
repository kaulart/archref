package de.arthurkaul.archref.model.topology;

import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;

@Entity
@Table(name="TOPOLOGYTEMPLATE")
public class TopologyTemplate extends de.arthurkaul.archref.model.Entity {

	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="topologyTemplate")
	@JsonManagedReference (value="topologyTemplate-nodeTemplate")
	private Collection<NodeTemplate> nodeTemplates;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="topologyTemplate")
	@JsonManagedReference (value="topologyTemplate-relationshipTemplate")
	private Collection<RelationshipTemplate> relationshipTemplates;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PARENTTOPOLOGYTEMPLATE")
	@JsonBackReference (value="topologyTemplate-topologyTemplate")
	private TopologyTemplate parentTopologyTemplate;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="parentTopologyTemplate")
	@JsonManagedReference (value="topologyTemplate-topologyTemplate")
	private Collection<TopologyTemplate> childTopologyTemplates;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference (value="levelgraph-topologytemplate")
	private LevelGraph levelGraph;
	
	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;
	
	@Column(name = "ABSTRACTIONLEVEL")
	private Long abstractionLevel;

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
