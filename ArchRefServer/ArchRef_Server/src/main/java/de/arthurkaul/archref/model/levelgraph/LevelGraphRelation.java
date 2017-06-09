package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;

@Entity
@Table(name="LEVELGRAPHRELATION")
public class LevelGraphRelation extends Relation{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCELEVEL_LEVELGRAPH_NODE_ID")
	@JsonBackReference (value = "level-inLevelGraphRelations")
	private LevelGraphNode sourceLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGETLEVEL_LEVELGRAPH_NODE_ID")
	@JsonBackReference  (value = "level-outLevelGraphRelations")
	private LevelGraphNode targetLevel;
	
	@Column(name = "SOURCE_LEVEL_VALUE")
	private Integer sourceLevelValue;
	
	@Column(name = "TARGET_LEVEL_VALUE")
	private Integer targetLevelValue;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVEL_GRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-sourcelevelgraphnodes")
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVELGRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-targetlevelgraphnodes")
	private LevelGraphNode targetLevelGraphNode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL_GRAPH_RELATION_ID")
	@JsonBackReference (value="levelgraph-levelgraphrelation")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

	@Column(name = "TYPE")
	private String levelGraphRelationType;

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

	public LevelGraph getLevelGraph() {
		return levelGraph;
	}

	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}

	public String getLevelGraphRelationType() {
		return levelGraphRelationType;
	}

	public void setLevelGraphRelationType(String levelGraphRelationType) {
		this.levelGraphRelationType = levelGraphRelationType;
	}

	public Integer getSourceLevelValue() {
		return sourceLevelValue;
	}

	public void setSourceLevelValue(Integer sourceLevelValue) {
		this.sourceLevelValue = sourceLevelValue;
	}

	public Integer getTargetLevelValue() {
		return targetLevelValue;
	}

	public void setTargetLevelValue(Integer targetLevelValue) {
		this.targetLevelValue = targetLevelValue;
	}

	public Long getLevelGraphId() {
		return levelGraphId;
	}

	public void setLevelGraphId(Long levelGraphId) {
		this.levelGraphId = levelGraphId;
	}

}
