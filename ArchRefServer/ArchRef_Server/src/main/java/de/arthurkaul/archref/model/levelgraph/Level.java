package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "LEVEL")
public class Level extends de.arthurkaul.archref.model.Entity{

	@Column(name = "DEPTH")
	@NotNull
	private Long depth;

	@Column(name = "VISIBLE")
	@NotNull
	private Boolean visible;

	@Column(name = "Y")
	@NotNull
	private Integer y;

	@Column(name = "HEIGHT")
	@NotNull
	private Integer height;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levels")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "sourceLevel")
//	@JsonManagedReference(value = "level-inLevelGraphRelations")
//	private Collection<LevelGraphRelation> inLevelGraphRelations;
//
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "targetLevel")
//	@JsonManagedReference(value = "level-outLevelGraphRelations")
//	private Collection<LevelGraphRelation> outLevelGraphRelations;
//
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "level")
//	@JsonManagedReference(value = "level-levelGraphNode")
//	private Collection<LevelGraphNode> levelGraphNodes;

	public Long getDepth() {
		return depth;
	}

	public void setDepth(Long depth) {
		this.depth = depth;
	}

	public Boolean getVisible() {
		return visible;
	}

	public void setVisible(Boolean visible) {
		this.visible = visible;
	}

	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
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

//	public Collection<LevelGraphNode> getLevelGraphNodes() {
//		return levelGraphNodes;
//	}
//
//	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
//		this.levelGraphNodes = levelGraphNodes;
//	}
//
//	public Collection<LevelGraphRelation> getInLevelGraphRelations() {
//		return inLevelGraphRelations;
//	}
//
//	public void setInLevelGraphRelations(Collection<LevelGraphRelation> inLevelGraphRelations) {
//		this.inLevelGraphRelations = inLevelGraphRelations;
//	}
//
//	public Collection<LevelGraphRelation> getOutLevelGraphRelations() {
//		return outLevelGraphRelations;
//	}
//
//	public void setOutLevelGraphRelations(Collection<LevelGraphRelation> outLevelGraphRelations) {
//		this.outLevelGraphRelations = outLevelGraphRelations;
//	}

}
