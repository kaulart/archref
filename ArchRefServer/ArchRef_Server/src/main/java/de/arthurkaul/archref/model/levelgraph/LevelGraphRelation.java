package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;

@Entity
@Table(name="LEVELGRAPHRELATION")
public class LevelGraphRelation extends Relation{

	@Column(name = "SOURCE_LEVEL_DEPTH")
	private Integer sourceLevelDepth;
	
	@Column(name = "TARGET_LEVEL_DEPTH")
	private Integer targetLevelDepth;
	
	@ManyToMany
	@JoinTable(name = "LEVELGRAPHRELATION_LEVELGRAPHNODE", 
			joinColumns = @JoinColumn(name = "LEVELGRAPHNODE_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "LEVELGRAPHRELATION_ID", referencedColumnName = "ID"))
	private Collection<LevelGraphNode> levelGraphNodes;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL_GRAPH")
	@JsonBackReference (value="levelgraph-levelgraphrelation")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

	@ManyToMany
	@JoinTable(name = "LEVELGRAPHRELATION_LEVEL", 
			joinColumns = @JoinColumn(name = "LEVELGRAPHRELATION_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "LEVEL_ID", referencedColumnName = "ID"))
	private Collection<Level> levels;
	
	@Column(name = "SOURCELEVEL_ID")
	private Long sourceLevelId;
	
	@Column(name = "TARGETLEVEL_ID")
	private Long targetLevelId;
	
	@Column(name = "TYPE")
	private String levelGraphRelationType;

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

	public Long getLevelGraphId() {
		return levelGraphId;
	}

	public void setLevelGraphId(Long levelGraphId) {
		this.levelGraphId = levelGraphId;
	}

	public Integer getSourceLevelDepth() {
		return sourceLevelDepth;
	}

	public void setSourceLevelDepth(Integer sourceLevelDepth) {
		this.sourceLevelDepth = sourceLevelDepth;
	}

	public Integer getTargetLevelDepth() {
		return targetLevelDepth;
	}

	public void setTargetLevelDepth(Integer targetLevelDepth) {
		this.targetLevelDepth = targetLevelDepth;
	}

//	public Collection<LevelGraphNode> getLevelGraphNodes() {
//		return levelGraphNodes;
//	}
//
//	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
//		this.levelGraphNodes = levelGraphNodes;
//	}

	public Collection<Level> getLevels() {
		return levels;
	}

	public void setLevels(Collection<Level> levels) {
		this.levels = levels;
	}

	public Long getSourceLevelId() {
		return sourceLevelId;
	}

	public void setSourceLevelId(Long sourceLevelId) {
		this.sourceLevelId = sourceLevelId;
	}

	public Long getTargetLevelId() {
		return targetLevelId;
	}

	public void setTargetLevelId(Long targetLevelId) {
		this.targetLevelId = targetLevelId;
	}

}
