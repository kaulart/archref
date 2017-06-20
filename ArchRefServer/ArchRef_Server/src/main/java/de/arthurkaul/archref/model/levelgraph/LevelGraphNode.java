package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraphNode Data Model - A node of a LevelGraph
 *
 * @Entity
 * @superFields - id: number - ID of the LevelGraphNode
 * @superFields - name: string - Name of the LevelGraphNode
 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected properties of the LevelGraphNode
 * @superFields - providedProperties: ProvidedProperty[] - Array of provided properties of the LevelGraphNode
 *
 * @Node
 * @superFields - x: number - x Position of the left upper corner of a rectangle
 * @superFields - y: number - y Position of the left upper corner of a rectangle
 * @superFields - width: number - Width of the rectangle
 * @superFields - height: number - Height of the rectangle
 *
 * @fields - level: Level - Level of the Node
 * @fields - levelId: number - ID of the Level of the Node
 * @fields - levelDepth: number - Level depth of the node
 * @fields - levelGraph: LevelGraph - LevelGraph of the Node
 * @fields - levelGraphId: number - ID of the LevelGraph of the Node
 * @fields - inLevelGraphRelations: LevelGraphRelation[] - Array of all incoming relations of the node
 * @fields - outLevelGraphRelations: LevelGraphRelation[] - Array of all outgoing relations of the node
 * @fields - levelGraphNodeType: string - Type of the LevelGraphNode;
 * @fields - levelGraphNodeTypeId: number - ID of the Type of the LevelGraphNode
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
	private Long levelDepth;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;
	
	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "targetLevelGraphNode")
	@JsonManagedReference(value = "inLevelGraphRelations-sourceLevelGraphNode")
	private Collection<LevelGraphRelation> inLevelGraphRelations;

	@OneToMany(cascade = {CascadeType.REMOVE, CascadeType.REFRESH}, fetch = FetchType.LAZY, mappedBy = "sourceLevelGraphNode")
	@JsonManagedReference(value = "outLevelGraphRelations-targetLevelGraphNode")
	private Collection<LevelGraphRelation> outLevelGraphRelations;

	@Column(name = "LEVELGRAPHNODETYPE")
	private String levelGraphNodeType;

	@Column(name = "LEVELGRAPHNODETYPE_ID")
	private long levelGraphNodeTypeId;

	@OneToMany( fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-nodeTemplate")
	private Collection<NodeTemplate> nodeTemplates;

	@OneToMany( fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-relationshipTemplates")
	private Collection<RelationshipTemplate> relationshipTemplates;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * Getter and Setter for the fields
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

	public Collection<LevelGraphRelation> getInLevelGraphRelations() {
		return inLevelGraphRelations;
	}

	public void setInLevelGraphRelations(Collection<LevelGraphRelation> inLevelGraphRelations) {
		this.inLevelGraphRelations = inLevelGraphRelations;
	}

	public Collection<LevelGraphRelation> getOutLevelGraphRelations() {
		return outLevelGraphRelations;
	}

	public void setOutLevelGraphRelations(Collection<LevelGraphRelation> outLevelGraphRelations) {
		this.outLevelGraphRelations = outLevelGraphRelations;
	}

	public Long getLevelDepth() {
		return levelDepth;
	}

	public void setLevelDepth(Long levelDepth) {
		this.levelDepth = levelDepth;
	}

}
