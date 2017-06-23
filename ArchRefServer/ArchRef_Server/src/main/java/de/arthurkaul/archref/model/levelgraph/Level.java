package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.CascadeType;
//import javax.persistence.CascadeType;
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

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Level - Level for the Level Graph Model for display the levels in the LevelGraphModellerComponent
 *
 * @field - Long id - ID of the level
 * @field - Integer depth - Depth of the level in the LevelGraph
 * @field - boolean visible - Indicates if a level should be displayed or not in the LevelGraphModellerComponent
 * @field - float y - Y-Position of the level layer in the LevelGraphModellerComponent
 * @field - float height - Height of the level layer in the LevelGraphModellerComponent
 * @field - LevelGraph levelGraph - Corresponding LevelGraph for the Level
 * @field - Long levelGraphId: number - ID of the corresponding LevelGraph
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "LEVEL")
public class Level {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "DEPTH")
	@NotNull
	private int depth;

	@Column(name = "VISIBLE")
	@NotNull
	private Boolean visible;

	@Column(name = "Y")
	@NotNull
	private Integer y;

	@Column(name = "HEIGHT")
	@NotNull
	private Integer height;

	@ManyToOne(cascade = { CascadeType.MERGE }, fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levels")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

	// @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "targetLevel")
	// @JsonManagedReference(value = "inLevelGraphRelations-targetLevel")
	// private Collection<LevelGraphRelation> inLevelGraphRelations;
	//
	// @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "sourceLevel")
	// @JsonManagedReference(value = "outLevelGraphRelation-sourceLevel")
	// private Collection<LevelGraphRelation> outLevelGraphRelations;
	//
	// @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY, mappedBy = "level")
	// @JsonManagedReference(value = "level-levelGraphNode")
	// private Collection<LevelGraphNode> levelGraphNodes;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter - Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
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

	// public Collection<LevelGraphNode> getLevelGraphNodes() {
	// return levelGraphNodes;
	// }
	//
	// public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
	// this.levelGraphNodes = levelGraphNodes;
	// }
	//
	// public Collection<LevelGraphRelation> getOutLevelGraphRelations() {
	// return outLevelGraphRelations;
	// }
	//
	// public void setOutLevelGraphRelations(Collection<LevelGraphRelation> outLevelGraphRelations) {
	// this.outLevelGraphRelations = outLevelGraphRelations;
	// }
	//
	// public Collection<LevelGraphRelation> getInLevelGraphRelations() {
	// return inLevelGraphRelations;
	// }
	//
	// public void setInLevelGraphRelations(Collection<LevelGraphRelation> inLevelGraphRelations) {
	// this.inLevelGraphRelations = inLevelGraphRelations;
	// }

}
