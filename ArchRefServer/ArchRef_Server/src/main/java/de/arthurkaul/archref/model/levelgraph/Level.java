package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "LEVEL")
public class Level {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

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

	@ManyToMany
	@JoinTable(name = "LEVELGRAPHRELATION_LEVEL", 
			joinColumns = @JoinColumn(name = "LEVELGRAPHRELATION_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "LEVEL_ID", referencedColumnName = "ID"))
	private Collection<LevelGraphRelation> levelGraphRelations;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "level")
	@JsonManagedReference(value = "level-levelGraphNode")
	private Collection<LevelGraphNode> levelGraphNodes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
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

	public Collection<LevelGraphRelation> getLevelGraphRelations() {
		return levelGraphRelations;
	}

	public void setLevelGraphRelations(Collection<LevelGraphRelation> levelGraphRelations) {
		this.levelGraphRelations = levelGraphRelations;
	}

	public Collection<LevelGraphNode> getLevelGraphNodes() {
		return levelGraphNodes;
	}

//	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
//		this.levelGraphNodes = levelGraphNodes;
//	}

}
