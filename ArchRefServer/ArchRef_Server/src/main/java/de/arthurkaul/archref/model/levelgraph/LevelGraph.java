package de.arthurkaul.archref.model.levelgraph;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.constants.Constants;
import de.arthurkaul.archref.constants.LevelGraphNodeType;
import de.arthurkaul.archref.constants.LevelGraphRelationType;
import de.arthurkaul.archref.model.Base;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <LevelGraph> - LevelGraph is used for the refinement of <TopologyTemplate> Data Models
 *
 * @field - String name - Name of the LevelGraph
 * @field - List<Level> levels - List of the different levels of a LevelGraph
 * @field - List<LevelGraphNode> levelGraphNodes - List of all LevelGraphNodes in the LevelGraph
 * @field - List<LevelGraphRelation> levelGraphRelations - List of all LevelGraphRelations in the LevelGraph
 * @field - ArrayList<ArrayList<LevelGraphNode>> nodeTypes- Used to construct of LevelGraphNodes of the NodeType according to the level only used for the refinement
 * @field - ArrayList<ArrayList<LevelGraphNode>> nodeTypeFragments - Used to construct of LevelGraphNodes of the NodeTypeFragment according to the level refinement
 * @field - ArrayList<ArrayList<LevelGraphNode>> relationshipTypes - Used to construct of LevelGraphNodes of the RelationshipTypes according to the level refinement
 * @field - ArrayList<ArrayList<LevelGraphNode>> relationshipTypeFragments - Used to construct of LevelGraphNodes of the RelationshipTypeFragments according to the level refinement
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
	@XmlAttribute(name = "name", required = true)
	private String name = "Unnamed";

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@Cascade(CascadeType.ALL)
	@JsonManagedReference(value = "levelgraph-levels")
	@XmlElementWrapper(name = "AbstractionLevels")
	@XmlElement(name = "AbstractioLevel")
	private List<Level> levels = new ArrayList<Level>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@Cascade(CascadeType.ALL)
	@JsonManagedReference(value = "levelgraph-levelgraphnodes")
	@XmlElementWrapper(name = "LevelGraphNodes")
	@XmlElement(name = "LevelGraphNode")
	private List<LevelGraphNode> levelGraphNodes = new ArrayList<LevelGraphNode>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@Cascade(CascadeType.ALL)
	@JsonManagedReference(value = "levelgraph-levelgraphrelation")
	@XmlElementWrapper(name = "LevelGraphRelations")
	@XmlElement(name = "LevelGraphRelation")
	private List<LevelGraphRelation> levelGraphRelations = new ArrayList<LevelGraphRelation>();

	// Temporary fields used for the refinement only
	@Transient
	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> nodeTypes = new ArrayList<ArrayList<LevelGraphNode>>();

	@Transient
	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> nodeTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();

	@Transient
	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypes = new ArrayList<ArrayList<LevelGraphNode>>();

	@Transient
	@XmlTransient
	private ArrayList<ArrayList<LevelGraphNode>> relationshipTypeFragments = new ArrayList<ArrayList<LevelGraphNode>>();

	@Transient
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
			}

		}

	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method - updatePosition - Update the Position to default values. Needed for import to initialize the view positions of the front-end
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public void updatePosition() {

		for (Level level : this.getLevels()) {
			level.setY(level.getDepth() * Constants.LEVELHEIGHT + level.getDepth() * Constants.LEVELGAPOFFSET);
		}

		for (LevelGraphNode levelGraphNode : this.getLevelGraphNodes()) {

			for (LevelGraphRelation levelGraphRelation : this.getLevelGraphRelations()) {

				if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.REFINE_TO)) {

					if (levelGraphRelation.getSourceNodeId().equals(levelGraphNode.getId())) {
						levelGraphRelation.getPath().getPoints().get(0)
								.setY(levelGraphNode.getLevelDepth() * Constants.LEVELHEIGHT + levelGraphNode.getLevelDepth() * Constants.LEVELGAPOFFSET + levelGraphNode.getHeight() / 2);
						levelGraphRelation.getPath().getPoints().get(0).setX(levelGraphNode.getX() + Constants.NODEWIDTH / 2 + Constants.LEVELGAPOFFSET);
						levelGraphRelation.getPath().updatePath();
					}

					if (levelGraphRelation.getTargetNodeId().equals(levelGraphNode.getId())) {
						levelGraphRelation.getPath().getPoints().get(1)
								.setY(levelGraphNode.getLevelDepth() * Constants.LEVELHEIGHT + levelGraphNode.getLevelDepth() * Constants.LEVELGAPOFFSET + levelGraphNode.getHeight() / 2);
						levelGraphRelation.getPath().getPoints().get(1).setX(levelGraphNode.getX() + Constants.NODEWIDTH / 2 + Constants.LEVELGAPOFFSET);

						levelGraphRelation.getPath().updatePath();
					}
				}

			}

		}

	}

}
