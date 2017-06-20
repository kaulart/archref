package de.arthurkaul.archref.model.levelgraph;
import java.util.Collection;

import javax.persistence.CascadeType;
//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/*******************************************************************************************************************************************************************************************************
*
* @data - Level Data Model - Level for the Level Graph Model for display the levels in the LevelGraphModellerComponent
*
* @fields - id: number - ID of the level
* @fields - depth: number - Depth of the level in the LevelGraph
* @fields - visible: boolean - Indicates if a level should be displayed or not in the LevelGraphModellerComponent
* @fields - y: number - Y-Position of the level layer in the LevelGraphModellerComponent
* @fields - height: number - Height of the level layer in the LevelGraphModellerComponent
* @fields - levelGraph: LevelGraph height: number - Corresponding LevelGraph for the Level
* @fields - levelGraphId: number - ID of the corresponding LevelGraph
* @fields - levelGraphRelations: LevelGraphRelation[] = [] - Array of all Relations which have the target or source node in this level
* @fields - levelGraphNodes: LevelGraphNode[] = [] - Array of all Node which are in this level
*
* //TODO You may decide to decouple level data from data which is only be used for display reasons in the LevelGraphModellerComponent
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

	@ManyToOne(cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levels")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

//	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "targetLevel")
//	@JsonManagedReference(value = "inLevelGraphRelations-targetLevel")
//	private Collection<LevelGraphRelation> inLevelGraphRelations;
//	
//	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "sourceLevel")
//	@JsonManagedReference(value = "outLevelGraphRelation-sourceLevel")
//	private Collection<LevelGraphRelation> outLevelGraphRelations;
//
//	@OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY, mappedBy = "level")
//	@JsonManagedReference(value = "level-levelGraphNode")
//	private Collection<LevelGraphNode> levelGraphNodes;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	
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


//	public Collection<LevelGraphNode> getLevelGraphNodes() {
//		return levelGraphNodes;
//	}
//
//	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
//		this.levelGraphNodes = levelGraphNodes;
//	}
//
//	public Collection<LevelGraphRelation> getOutLevelGraphRelations() {
//		return outLevelGraphRelations;
//	}
//
//	public void setOutLevelGraphRelations(Collection<LevelGraphRelation> outLevelGraphRelations) {
//		this.outLevelGraphRelations = outLevelGraphRelations;
//	}
//
//	public Collection<LevelGraphRelation> getInLevelGraphRelations() {
//		return inLevelGraphRelations;
//	}
//
//	public void setInLevelGraphRelations(Collection<LevelGraphRelation> inLevelGraphRelations) {
//		this.inLevelGraphRelations = inLevelGraphRelations;
//	}

}
