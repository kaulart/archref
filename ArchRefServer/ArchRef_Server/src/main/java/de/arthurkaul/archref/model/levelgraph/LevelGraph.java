package de.arthurkaul.archref.model.levelgraph;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Constants;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - LevelGraph - LevelGraph Model is used for the refinement of TopologyTemplate Data Models
 *
 * @field - Long id - ID of the LevelGraph
 * @field - String name - Name of the LevelGraph
 * @field - List<Level> levels - List of the different levels of a LevelGraph
 * @field - List<LevelGraphNode> levelGraphNodes - List of all LevelGraphNodes in the LevelGraph
 * @field - List<LevelGraphRelation> levelGraphRelations - List of all LevelGraphRelations in the LevelGraph
 * @field - List<TopologyTemplate> topologyTemplates - List of all TopologyTemplates which were created/generated with the LevelGraph
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "LEVELGRAPH")
public class LevelGraph {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levels")
	private List<Level> levels = new ArrayList<Level>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphnodes")
	private List<LevelGraphNode> levelGraphNodes = new ArrayList<LevelGraphNode>();

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphrelation")
	private List<LevelGraphRelation> levelGraphRelations = new ArrayList<LevelGraphRelation>();

	private ArrayList<ArrayList<LevelGraphNode>> nodeTypes = new ArrayList<ArrayList<LevelGraphNode>>();
	private ArrayList<ArrayList<LevelGraphNode>> nodeTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypes = new ArrayList<ArrayList<LevelGraphNode>>();
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();

	private int depth = 0;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter/ @setter - Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public List<Level> getLevels() {
		return levels;
	}

	public void setLevels(List<Level> levels) {
		this.levels = levels;
	}

	public List<LevelGraphNode> getLevelGraphNodes() {
		return levelGraphNodes;
	}

	public void setLevelGraphNodes(List<LevelGraphNode> levelGraphNodes) {
		this.levelGraphNodes = levelGraphNodes;
	}

	public List<LevelGraphRelation> getLevelGraphRelations() {
		return levelGraphRelations;
	}

	public void setLevelGraphRelations(List<LevelGraphRelation> levelGraphRelations) {
		this.levelGraphRelations = levelGraphRelations;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	public ArrayList<ArrayList<LevelGraphNode>> getNodeTypes() {
		return nodeTypes;
	}

	@JsonIgnore
	public void setNodeTypes(ArrayList<ArrayList<LevelGraphNode>> nodeTypes) {
		this.nodeTypes = nodeTypes;
	}

	@JsonIgnore
	public ArrayList<ArrayList<LevelGraphNode>> getNodeTypeFragments() {
		return nodeTypeFragments;
	}

	@JsonIgnore
	public void setNodeTypeFragments(ArrayList<ArrayList<LevelGraphNode>> nodeTypeFragments) {
		this.nodeTypeFragments = nodeTypeFragments;
	}

	@JsonIgnore
	public ArrayList<ArrayList<LevelGraphNode>> getRelationshipTypes() {
		return relationshipTypes;
	}

	@JsonIgnore
	public void setRelationshipTypes(ArrayList<ArrayList<LevelGraphNode>> relationshipTypes) {
		this.relationshipTypes = relationshipTypes;
	}

	@JsonIgnore
	public ArrayList<ArrayList<LevelGraphNode>> getRelationshipTypeFragments() {
		return relationshipTypeFragments;
	}

	@JsonIgnore
	public void setRelationshipTypeFragments(ArrayList<ArrayList<LevelGraphNode>> relationshipTypeFragments) {
		this.relationshipTypeFragments = relationshipTypeFragments;
	}

	// public ArrayList<ArrayList<LevelGraphRelation>> getConnectOverToRelations() {
	// return connectOverToRelations;
	// }
	//
	// public void setConnectOverToRelations(ArrayList<ArrayList<LevelGraphRelation>> connectedToRelations) {
	// this.connectOverToRelations = connectedToRelations;
	// }
	//
	// public ArrayList<ArrayList<LevelGraphRelation>> getRefineToRelations() {
	// return refineToRelations;
	// }
	//
	// public void setRefineToRelations(ArrayList<ArrayList<LevelGraphRelation>> refineToRelations) {
	// this.refineToRelations = refineToRelations;
	// }

	@JsonIgnore
	public int getDepth() {
		return depth;
	}

	@JsonIgnore
	public void setDepth(int maxLevel) {
		this.depth = maxLevel;
	}

	/**
	 * 
	 * @method - splitNodesAndRelations - Split the nodes and relations of a level graph in separate list according to the type and level of the LevelGraphNode / LevelGraphRelation Source
	 * 
	 */
	public void splitNodesAndRelations() {

		this.setNodeTypes(new ArrayList<ArrayList<LevelGraphNode>>());
		this.setNodeTypeFragments(new ArrayList<ArrayList<LevelGraphNode>>());
		this.setRelationshipTypes(new ArrayList<ArrayList<LevelGraphNode>>());
		this.setRelationshipTypeFragments(new ArrayList<ArrayList<LevelGraphNode>>());

		for (int i = 0; i <= this.depth; i++) {
			this.nodeTypes.add(new ArrayList<LevelGraphNode>());
			this.nodeTypeFragments.add(new ArrayList<LevelGraphNode>());
			this.relationshipTypes.add(new ArrayList<LevelGraphNode>());
			this.relationshipTypeFragments.add(new ArrayList<LevelGraphNode>());
		}

		for (LevelGraphNode levelGraphNode : this.levelGraphNodes) {
			if (levelGraphNode.getLevelGraphNodeType().equals(Constants.NODETYPE)) {
				this.nodeTypes.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(Constants.RELATIONSHIPTYPE)) {
				this.relationshipTypes.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(Constants.NODETYPEFRAGMENT)) {
				this.nodeTypeFragments.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(Constants.RELATIONSHIPTYPEFRAGMENT)) {
				this.relationshipTypeFragments.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			}

		}

	}

}
