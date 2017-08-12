package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.graph.Relation;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <LevelGraphRelation> - A relation of a <LevelGraph>. Extends the superclass <Relation> which extends the superclass <Entity>
 *
 * @field - Integer sourceLevelDepth - Depth of the level of the source LevelGraphNode
 * @field - Integer targetLevelDepth - Depth of the level of the target LevelGraphNode
 * @field - Long sourceLevelId - ID of the source level
 * @field - Long targetLevelId - ID of the target level
 * @field - <Level> sourceLevel - Source level object
 * @field - <Level> targetLevel - Target level object
 * @field - <LevelGraphNode> targetLevelGraphNode - Target LevelGraphNode of the levelGraphRelation
 * @field - <LevelGraphNode> sourceLevelGraphNode - Source LevelGraphNode of the levelGraphRelation
 * @field - <LevelGraph> levelGraph - LevelGraph of the LevelGraphReltation
 * @field - Long levelGraphId - ID of the LevelGraph of the LevelGraphRelation
 * @field - String levelGraphRelationType - Type of the LevelGraphRelation // You may decide to implement later the types as a Class for further Improvments currently it is enough to implement it as
 *        constant Strings
 * @field - boolean entryPoint - True if a LevelGraphRelation of type REFINE_TO is a outgoing relation of a LevelGraphNode of type NODEFTYPERAGMENT or RELATIONSHIPTYPEFRAGMENT and its target
 *        LevelGraphNode is a EntryPoint of the Fragment. Default is false.
 * @field - boolean exitPoint - True if a LevelGraphRelation of type REFINE_TO is a outgoing relation of a LevelGraphNode of type fragment and its target LevelGraphNode is a ExitPoint of the Fragment.
 *        Default is false.
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "LEVELGRAPHRELATION")
@XmlRootElement(name = "LevelGraphRelation")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tLevelGraphRelation")
public class LevelGraphRelation extends Relation {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "SOURCE_LEVEL_DEPTH")
	@XmlElement(name = "SourceAbstractioLevel", required = true)
	private Integer sourceLevelDepth;

	@Column(name = "TARGET_LEVEL_DEPTH")
	@XmlElement(name = "TargetAbstractioLevel", required = true)
	private Integer targetLevelDepth;

	@Column(name = "SOURCE_LEVEL_ID")
	@XmlAttribute(name = "sourceLevelId", required = true)
	private Long sourceLevelId;

	@Column(name = "TARGET_LEVEL_ID")
	@XmlAttribute(name = "targetLevelId", required = true)
	private Long targetLevelId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "TARGET_LEVELGRAPHNODE", updatable = false)
	@JsonBackReference(value = "inLevelGraphRelations-targetLevelGraphNode")
	@XmlElement(name = "TargetLevelGraphNode", required = true)
	private LevelGraphNode targetLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_LEVELGRAPHNODE", updatable = false)
	@JsonBackReference(value = "outLevelGraphRelations-sourceLevelGraphNode")
	@XmlElement(name = "SourceLevelGraphNode", required = true)
	private LevelGraphNode sourceLevelGraphNode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH", updatable = false)
	@JsonBackReference(value = "levelgraph-levelgraphrelation")
	@XmlInverseReference(mappedBy = "levelGraphRelations")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	@XmlAttribute(name = "levelGraphId", required = true)
	private Long levelGraphId;

	@Column(name = "TYPE")
	@XmlElement(name = "Type", required = true)
	private String levelGraphRelationType;

	@Column(name = "ENTRY_POINT")
	@XmlAttribute(name = "entryPoint", required = true)
	private Boolean entryPoint = false;

	@Column(name = "EXIT_POINT")
	@XmlAttribute(name = "exitPoint", required = true)
	private Boolean exitPoint = false;

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

	public Boolean isEntryPoint() {
		return entryPoint;
	}

	public void setEntryPoint(Boolean entryPoint) {
		this.entryPoint = entryPoint;
	}

	public Boolean isExitPoint() {
		return exitPoint;
	}

	public void setExitPoint(Boolean exitPoint) {
		this.exitPoint = exitPoint;
	}

}
