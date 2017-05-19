package de.arthurkaul.archref.model.levelgraph;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Path;


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

	@Column(name = "SOURCE_LEVEL_VALUE")
	private Integer sourceLevelValue;
	
	@Column(name = "TARGET_LEVEL_VALUE")
	private Integer targetLevelValue;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVEL_GRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-sourcelevelgraphnodes")
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGETLEVELGRAPH_NODE_ID")
	@JsonBackReference  (value="levelgraphrelation-targetlevelgraphnodes")
	private LevelGraphNode targetLevelGraphNode;
	
	@Column(name = "TYPE")
	private String levelGraphRelationType;

	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="PATH_ID")
	@JsonManagedReference (value="levelgraphrelation-path")
	private Path path;

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

	public Path getPath() {
		return path;
	}

	public void setPath(Path path) {
		this.path = path;
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



}
