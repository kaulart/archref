package de.arthurkaul.archref.model.levelgraph;

//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlIDExtension;
import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Level> - Level of a <LevelGraph> for display the levels and assign the <LevelGraphNode> and <LevelGraphRelation> to the different levels of a <LevelGraph>
 *
 * @field - Long id - ID of the level
 * @field - Integer depth - Depth of the level in the LevelGraph
 * @field - boolean visible - Indicates if a level should be displayed or not in the LevelGraphModellerComponent
 * @field - float y - Y-Position of the level layer in the LevelGraphModellerComponent
 * @field - float height - Height of the level layer in the LevelGraphModellerComponent
 * @field - <LevelGraph> levelGraph - Corresponding LevelGraph for the Level
 * @field - Long levelGraphId - ID of the corresponding LevelGraph
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@XmlRootElement(name = "LevelGraph")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tAbstrationLevel")
public class Level {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	@XmlAttribute(name = "id")
	@XmlIDExtension
	private Long id;

	@Column(name = "DEPTH")
	@NotNull
	@XmlAttribute(name = "abstractionDepth")
	private Integer depth;

	@Column(name = "VISIBLE")
	@NotNull
	@XmlAttribute(name = "visible")
	private Boolean visible = true;

	@Column(name = "Y")
	@NotNull
	@XmlAttribute(name = "y")
	private Integer y;

	@Column(name = "HEIGHT")
	@NotNull
	@XmlAttribute(name = "height")
	private Integer height;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levels")
	@XmlInverseReference(mappedBy = "levels")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	@XmlAttribute(name = "levelGraphId")
	private Long levelGraphId;

	// @OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "targetLevel")
	// @JsonManagedReference(value = "inLevelGraphRelations-targetLevel")
	// private List<LevelGraphRelation> inLevelGraphRelations;
	//
	// @OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "sourceLevel")
	// @JsonManagedReference(value = "outLevelGraphRelation-sourceLevel")
	// private List<LevelGraphRelation> outLevelGraphRelations;
	//
	// @OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "level")
	// @JsonManagedReference(value = "level-levelGraphNode")
	// private List<LevelGraphNode> levelGraphNodes;

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

	// @JsonIgnore
	// public List<LevelGraphNode> getLevelGraphNodes() {
	// return levelGraphNodes;
	// }
	//
	// @JsonIgnore
	// public void setLevelGraphNodes(List<LevelGraphNode> levelGraphNodes) {
	// this.levelGraphNodes = levelGraphNodes;
	// }
	//
	// @JsonIgnore
	// public List<LevelGraphRelation> getOutLevelGraphRelations() {
	// return outLevelGraphRelations;
	// }
	//
	// @JsonIgnore
	// public void setOutLevelGraphRelations(List<LevelGraphRelation> outLevelGraphRelations) {
	// this.outLevelGraphRelations = outLevelGraphRelations;
	// }
	//
	// @JsonIgnore
	// public List<LevelGraphRelation> getInLevelGraphRelations() {
	// return inLevelGraphRelations;
	// }
	//
	// @JsonIgnore
	// public void setInLevelGraphRelations(List<LevelGraphRelation> inLevelGraphRelations) {
	// this.inLevelGraphRelations = inLevelGraphRelations;
	// }

	public Level clone() {
		Level level = new Level();
		level.setDepth(this.depth);
		level.setHeight(this.height);
		level.setLevelGraphId(this.levelGraphId);
		level.setVisible(this.visible);
		level.setY(this.y);
		return level;
	}

}
