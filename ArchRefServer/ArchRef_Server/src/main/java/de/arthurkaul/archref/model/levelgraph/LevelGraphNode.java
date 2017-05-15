package de.arthurkaul.archref.model.levelgraph;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class LevelGraphNode {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "LEVEL_NODE_ID")
	@JsonBackReference (value="level-levelGraphNode")
	private Level level;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "LEVELGRAP_NODE_ID")
	@JsonBackReference (value="levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;

	@Column(name = "X_POSITION")
	private Integer x;

	@Column(name = "Y_POSITION")
	private Integer y;

	@Column(name = "WIDTH")
	private Integer width;

	@Column(name = "HEIGHT")
	private Integer height;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="targetLevelGraphNode")
	@JsonManagedReference (value="levelgraphrelation-targetlevelgraphnodes")
	private Collection<LevelGraphRelation> inLevelGraphRelation;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="sourceLevelGraphNode")
	@JsonManagedReference (value="levelgraphrelation-sourcelevelgraphnodes")
	private Collection<LevelGraphRelation> outLevelGraphRelation;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}


	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
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

	public Integer getX() {
		return x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

	public Collection<LevelGraphRelation> getInLevelGraphRelation() {
		return inLevelGraphRelation;
	}

	public void setInLevelGraphRelation(Collection<LevelGraphRelation> inLevelGraphRelation) {
		this.inLevelGraphRelation = inLevelGraphRelation;
	}

	public Collection<LevelGraphRelation> getOutLevelGraphRelation() {
		return outLevelGraphRelation;
	}

	public void setOutLevelGraphRelation(Collection<LevelGraphRelation> outLevelGraphRelation) {
		this.outLevelGraphRelation = outLevelGraphRelation;
	}

	

}
