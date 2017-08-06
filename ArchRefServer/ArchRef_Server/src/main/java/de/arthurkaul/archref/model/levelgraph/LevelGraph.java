package de.arthurkaul.archref.model.levelgraph;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.constants.LevelGraphNodeType;
import de.arthurkaul.archref.model.Base;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <LevelGraph> - LevelGraph is used for the refinement of <TopologyTemplate> Data Models
 *
 * @field - Long id - ID of the LevelGraph
 * @field - String name - Name of the LevelGraph
 * @field - List<Level> levels - List of the different levels of a LevelGraph
 * @field - List<LevelGraphNode> levelGraphNodes - List of all LevelGraphNodes in the LevelGraph
 * @field - List<LevelGraphRelation> levelGraphRelations - List of all LevelGraphRelations in the LevelGraph
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "LEVELGRAPH")
@XmlRootElement(name = "LevelGraph")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tLevelGraph")
public class LevelGraph extends Base {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "NAME")
	@XmlAttribute(name = "name")
	private String name = "Unnamed";

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levels")
	@XmlElementWrapper(name = "AbstractionLevels")
	@XmlElement(name = "AbstractioLevel")
	private List<Level> levels = new ArrayList<Level>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphnodes")
	@XmlElementWrapper(name = "LevelGraphNodes")
	@XmlElement(name = "LevelGraphNode")
	private List<LevelGraphNode> levelGraphNodes = new ArrayList<LevelGraphNode>();

	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphrelation")
	@XmlElementWrapper(name = "LevelGraphRelations")
	@XmlElement(name = "LevelGraphRelation")
	private List<LevelGraphRelation> levelGraphRelations = new ArrayList<LevelGraphRelation>();

	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> nodeTypes = new ArrayList<ArrayList<LevelGraphNode>>();

	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> nodeTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();

	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypes = new ArrayList<ArrayList<LevelGraphNode>>();

	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();

	@XmlTransient
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

	@JsonIgnore
	public int getDepth() {
		return depth;
	}

	@JsonIgnore
	public void setDepth(int maxLevel) {
		this.depth = maxLevel;
	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method - splitNodes - Split the nodes of a level graph in separate list according to the type and level of the LevelGraphNode
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public void splitNodes() {

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
			if (levelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPE)) {
				levelGraphNode.splitRelations();
				this.nodeTypes.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPE)) {
				levelGraphNode.splitRelations();
				this.relationshipTypes.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.NODETYPEFRAGMENT)) {
				levelGraphNode.splitFragmentRelations();
				this.nodeTypeFragments.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			} else if (levelGraphNode.getLevelGraphNodeType().equals(LevelGraphNodeType.RELATIONSHIPTYPEFRAGMENT)) {
				levelGraphNode.splitFragmentRelations();
				this.relationshipTypeFragments.get(levelGraphNode.getLevelDepth()).add(levelGraphNode);
			}

		}

	}

	// public void setIdToNull() {
	// this.setId(null);
	// for (LevelGraphNode levelGraphNode : this.levelGraphNodes) {
	// levelGraphNode.setIdToNull();
	// }
	// for (LevelGraphRelation levelGraphRelation : this.levelGraphRelations) {
	// levelGraphRelation.setIdToNull();
	// }
	// for (Level level : this.levels) {
	// level.setIdToNull();
	// }
	// }

}
