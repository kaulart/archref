package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.topology.NodeTemplate;

@Entity
@Table(name = "LEVELGRAPHNODE")
public class LevelGraphNode extends Node {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL")
	@JsonBackReference(value = "level-levelGraphNode")
	private Level level;

	@Column(name = "LEVEL_ID")
	private Long levelId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;
//
//	@ManyToMany
//	@JoinTable(name = "LEVELGRAPHRELATION_LEVELGRAPHNODE", 
//			joinColumns = @JoinColumn(name = "LEVELGRAPHRELATION_ID", referencedColumnName = "ID"), 
//			inverseJoinColumns = @JoinColumn(name = "LEVELGRAPHNODE_ID", referencedColumnName = "ID"))
    @ManyToMany( fetch=FetchType.LAZY, mappedBy="levelGraphNodes")
    private Collection<LevelGraphRelation> levelGraphRelations;
	
	@Column(name = "LEVELGRAPHNODETYPE")
	private String levelGraphNodeType;

	@Column(name = "LEVELGRAPHNODETYPE_ID")
	private long levelGraphNodeTypeId;

	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraphNode")
	@JsonManagedReference (value = "levelGraphNode-nodeTemplate")
	private Collection<NodeTemplate> nodeTemplates;
	
	//private Collection<RelationshipTemplate> relationshipTemplates
	
	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}
	
	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}
	
	public LevelGraph getLevelGraph() {
		return levelGraph;
	}

	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}

	public Long getLevelGraphId() {
		return levelGraphId;
	}

	public void setLevelGraphId(Long levelGraphId) {
		this.levelGraphId = levelGraphId;
	}

	public Collection<LevelGraphRelation> getLevelGraphRelations() {
		return levelGraphRelations;
	}

	public void setLevelGraphRelations(Collection<LevelGraphRelation> levelGraphRelations) {
		this.levelGraphRelations = levelGraphRelations;
	}

	public String getLevelGraphNodeType() {
		return levelGraphNodeType;
	}

	public void setLevelGraphNodeType(String levelGraphNodeType) {
		this.levelGraphNodeType = levelGraphNodeType;
	}

	public long getLevelGraphNodeTypeId() {
		return levelGraphNodeTypeId;
	}

	public void setLevelGraphNodeTypeId(long levelGraphNodeTypeId) {
		this.levelGraphNodeTypeId = levelGraphNodeTypeId;
	}


}
