package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraphRelation Data Model - A relation of a LevelGraph
 *
 * @Entity
 * @superFields - id: number - ID of the LevelGraphNode
 * @superFields - name: string - Name of the LevelGraphNode
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @Relation
 * @superFields - sourceNodeId: number - ID of the Source Node of LevelGraphRelation
 * @superFields - targetNodeId: number - ID of the Target Node of LevelGraphRelation
 * @superFields - path: Path - Path of the line from source node to target node
 *
 * @fields - sourceLevelDepth: number - Depth of the level of the source node
 * @fields - targetLevelDepth: number - Depth of the level of the target node
 * @fields - sourceLevelId: number - ID of the source level
 * @fields - targetLevelId: number - ID of the target level
 * @fields - sourceLevel: Level - ID of the source level
 * @fields - targetLevel: Level - ID of the target level
 * @fields - targetLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @fields - sourceLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @fields - levelGraph: LevelGraph - LevelGraph of the LevelGraphReltation
 * @fields - levelGraphId: number - ID of the LevelGraph of the LevelGraphRelation
 * @fields - levelGraphRelationType: string - Type of the LevelGraphRelation // You may decide to implement later the types as a Class for further
 *                                                                              Improvments currently it is enough to implement it as constant Strings
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "LEVELGRAPHRELATION")
public class LevelGraphRelation extends Relation {
	
	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	
	@Column(name = "SOURCE_LEVEL_DEPTH")
	private Integer sourceLevelDepth;

	@Column(name = "TARGET_LEVEL_DEPTH")
	private Integer targetLevelDepth;

	@Column(name = "SOURCE_LEVEL_ID")
	private Long sourceLevelId;

	@Column(name = "TARGET_LEVEL_ID")
	private Long targetLevelId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVEL")
	@JsonBackReference(value = "outLevelGraphRelation-sourceLevel")
//	@Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})	
	private Level sourceLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVEL")
	@JsonBackReference(value = "inLevelGraphRelations-targetLevel")
//	@Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})	
	private Level targetLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVELGRAPHNODE")
	@JsonBackReference(value = "inLevelGraphRelations-sourceLevelGraphNode")
//	@Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})	
	private LevelGraphNode targetLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVELGRAPHNODE")
	@JsonBackReference(value = "outLevelGraphRelations-targetLevelGraphNode")
//	@Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})	
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphrelation")
//	@Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})	
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

	@Column(name = "TYPE")
	private String levelGraphRelationType;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	
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

	public LevelGraphNode getTargetLevelGraphNode() {
		return targetLevelGraphNode;
	}

	public void setTargetLevelGraphNode(LevelGraphNode targetLevelGraphNode) {
		this.targetLevelGraphNode = targetLevelGraphNode;
	}

	public LevelGraphNode getSourceLevelGraphNode() {
		return sourceLevelGraphNode;
	}

	public void setSourceLevelGraphNode(LevelGraphNode sourceLevelGraphNode) {
		this.sourceLevelGraphNode = sourceLevelGraphNode;
	}

	public Level getSourceLevel() {
		return sourceLevel;
	}

	public void setSourceLevel(Level sourceLevel) {
		this.sourceLevel = sourceLevel;
	}

	public Level getTargetLevel() {
		return targetLevel;
	}

	public void setTargetLevel(Level targetLevel) {
		this.targetLevel = targetLevel;
	}

}
