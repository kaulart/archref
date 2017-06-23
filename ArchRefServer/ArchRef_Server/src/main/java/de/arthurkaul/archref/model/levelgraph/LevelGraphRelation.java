package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraphRelation - A relation of a LevelGraph
 *
 * @class Entity
 * @superField - id: number - ID of the LevelGraphNode
 * @superField - name: string - Name of the LevelGraphNode
 * @superField - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superField - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @class Relation
 * @superField - sourceNodeId: number - ID of the Source Node of LevelGraphRelation
 * @superField - targetNodeId: number - ID of the Target Node of LevelGraphRelation
 * @superField - path: Path - Path of the line from source node to target node
 *
 * @field - sourceLevelDepth: number - Depth of the level of the source node
 * @field - targetLevelDepth: number - Depth of the level of the target node
 * @field - sourceLevelId: number - ID of the source level
 * @field - targetLevelId: number - ID of the target level
 * @field - sourceLevel: Level - ID of the source level
 * @field - targetLevel: Level - ID of the target level
 * @field - targetLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @field - sourceLevelGraphNode: LevelGraphNode - Source and Target Node of the levelGraphRelation
 * @field - levelGraph: LevelGraph - LevelGraph of the LevelGraphReltation
 * @field - levelGraphId: number - ID of the LevelGraph of the LevelGraphRelation
 * @field - levelGraphRelationType: string - Type of the LevelGraphRelation // You may decide to implement later the types as a Class for further Improvments currently it is enough to implement it as
 *        constant Strings
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
	@JoinColumn(name = "SOURCE_LEVEL", updatable = false)
	@JsonBackReference(value = "outLevelGraphRelation-sourceLevel")
	// @Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})
	private Level sourceLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVEL", updatable = false)
	@JsonBackReference(value = "inLevelGraphRelations-targetLevel")
	// @Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})
	private Level targetLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_LEVELGRAPHNODE", updatable = false)
	@JsonBackReference(value = "inLevelGraphRelations-sourceLevelGraphNode")
	// @Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})

	private LevelGraphNode targetLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVELGRAPHNODE", updatable = false)
	@JsonBackReference(value = "outLevelGraphRelations-targetLevelGraphNode")
	// @Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH", updatable = false)
	@JsonBackReference(value = "levelgraph-levelgraphrelation")
	// @Cascade({CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH})
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
