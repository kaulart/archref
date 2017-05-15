package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class LevelGraphRelation {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL_GRAPH_RELATION_ID")
	@JsonBackReference (value="levelgraph-levelgraphrelation")
	private LevelGraph levelGraph;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVEL_ID")
	@JsonBackReference (value="level-sourceLevelGraphRelation")
	private Level sourceLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVEL_ID")
	@JsonBackReference  (value="level-targetLevelGraphRelation")
	private Level targetLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVEL_GRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-sourcelevelgraphnodes")
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGETLEVELGRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-targetlevelgraphnodes")
	private LevelGraphNode targetLevelGraphNode;


	public Level getSourceLevel() {
		return sourceLevel;
	}

	public void setSourceLevel(Level sourceLevel) {
		this.sourceLevel = sourceLevel;
	}

	public Level getTargetLevel() {
		return targetLevel;
	}

	public void setTargetLevel(Level targetLevel) {
		this.targetLevel = targetLevel;
	}

	public LevelGraphNode getSourceLevelGraphNode() {
		return sourceLevelGraphNode;
	}

	public void setSourceLevelGraphNode(LevelGraphNode sourceLevelGraphNode) {
		this.sourceLevelGraphNode = sourceLevelGraphNode;
	}

	public LevelGraphNode getTargetLevelGraphNode() {
		return targetLevelGraphNode;
	}

	public void setTargetLevelGraphNode(LevelGraphNode targetLevelGraphNode) {
		this.targetLevelGraphNode = targetLevelGraphNode;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LevelGraph getLevelGraph() {
		return levelGraph;
	}

	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}

}
