package de.arthurkaul.archref.model.levelgraph;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraphNode - A node of a LevelGraph
 *
 * @class Entity
 * @superField - Long id - ID of the LevelGraphNode
 * @superField - String name - Name of the LevelGraphNode
 * @superField - List<ExpectedProperty> expectedProperties - Array of expected properties of the LevelGraphNode
 * @superField - List<ProvidedProperty> providedProperties - Array of provided properties of the LevelGraphNode
 *
 * @class Node
 * @superField - float x - x Position of the left upper corner of a rectangle
 * @superField - float y - y Position of the left upper corner of a rectangle
 * @superField - float width - Width of the rectangle
 * @superField - float height - Height of the rectangle
 *
 * @field - Level level - Level of the Node
 * @field - Long levelId - ID of the Level of the Node
 * @field - Integer levelDepth - Level depth of the node
 * @field - LevelGraph levelGraph - LevelGraph of the Node
 * @field - Long levelGraphId - ID of the LevelGraph of the Node
 * @field - List<LevelGraphRelation> inLevelGraphRelations - Array of all incoming relations of the node
 * @field - List<LevelGraphRelation> outLevelGraphRelations - Array of all outgoing relations of the node
 * @field - String levelGraphNodeType - Type of the LevelGraphNode;
 * @field - Long levelGraphNodeTypeId - ID of the Type of the LevelGraphNode
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "LEVELGRAPHNODE")
public class LevelGraphNode extends Node {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL")
	@JsonBackReference(value = "level-levelGraphNode")
	private Level level;

	@Column(name = "LEVEL_ID")
	private Long levelId;

	@Column(name = "LEVEL_DEPTH")
	private int levelDepth;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "targetLevelGraphNode")
	@JsonManagedReference(value = "inLevelGraphRelations-sourceLevelGraphNode")
	private List<LevelGraphRelation> inLevelGraphRelations;

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "sourceLevelGraphNode")
	@JsonManagedReference(value = "outLevelGraphRelations-targetLevelGraphNode")
	private List<LevelGraphRelation> outLevelGraphRelations;

	@Column(name = "LEVELGRAPHNODETYPE")
	private String levelGraphNodeType;

	@Column(name = "LEVELGRAPHNODETYPE_ID")
	private long levelGraphNodeTypeId;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-nodeTemplate")
	private List<NodeTemplate> nodeTemplates = new ArrayList<NodeTemplate>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-relationshipTemplates")
	private List<RelationshipTemplate> relationshipTemplates = new ArrayList<RelationshipTemplate>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter - Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
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

	public String getLevelGraphNodeType() {
		return levelGraphNodeType;
	}

	public void setLevelGraphNodeType(String levelGraphNodeType) {
		this.levelGraphNodeType = levelGraphNodeType;
	}

	public long getLevelGraphNodeTypeId() {
		return levelGraphNodeTypeId;
	}

	public void setLevelGraphNodeTypeId(long levelGraphNodeTypeId) {
		this.levelGraphNodeTypeId = levelGraphNodeTypeId;
	}

	public List<LevelGraphRelation> getInLevelGraphRelations() {
		return inLevelGraphRelations;
	}

	public void setInLevelGraphRelations(List<LevelGraphRelation> inLevelGraphRelations) {
		this.inLevelGraphRelations = inLevelGraphRelations;
	}

	public List<LevelGraphRelation> getOutLevelGraphRelations() {
		return outLevelGraphRelations;
	}

	public void setOutLevelGraphRelations(List<LevelGraphRelation> outLevelGraphRelations) {
		this.outLevelGraphRelations = outLevelGraphRelations;
	}

	public int getLevelDepth() {
		return levelDepth;
	}

	public void setLevelDepth(int levelDepth) {
		this.levelDepth = levelDepth;
	}

	// @JsonIgnore
	// public List<NodeTemplate> getNodeTemplates() {
	// return nodeTemplates;
	// }
	//
	// @JsonIgnore
	// public void setNodeTemplates(List<NodeTemplate> nodeTemplates) {
	// this.nodeTemplates = nodeTemplates;
	// }
	//
	// @JsonIgnore
	// public List<RelationshipTemplate> getRelationshipTemplates() {
	// return relationshipTemplates;
	// }
	//
	// @JsonIgnore
	// public void setRelationshipTemplates(List<RelationshipTemplate> relationshipTemplates) {
	// this.relationshipTemplates = relationshipTemplates;
	// }

}
