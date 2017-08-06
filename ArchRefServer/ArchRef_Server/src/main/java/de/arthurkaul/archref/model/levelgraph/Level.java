package de.arthurkaul.archref.model.levelgraph;

//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.Base;

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
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tAbstrationLevel")
public class Level extends Base {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter - Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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
