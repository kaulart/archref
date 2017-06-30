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
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.LevelGraphRelationType;
import de.arthurkaul.archref.model.graph.Node;
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <LevelGraphNode> - A node of a <LevelGraph>. Extends the superclass <Node> which extends the superclass <Entity>.
 *
 * @field - <Level> level - Level of the LevelGraphNode
 * @field - Long levelId - ID of the Level of the LevelGraphNode
 * @field - Integer levelDepth - Level depth of the LevelGraphNode
 * @field - <LevelGraph> levelGraph - LevelGraph of the LevelGraphNode
 * @field - Long levelGraphId - ID of the LevelGraph of the LevelGraphNode
 * @field - List<LevelGraphRelation> inLevelGraphRelations - List of all incoming relations of the LevelGraphNode
 * @field - List<LevelGraphRelation> outLevelGraphRelations - List of all outgoing relations of the LevelGraphNode
 * @field - String levelGraphNodeType - Type of the LevelGraphNode;
 * @field - Long levelGraphNodeTypeId - ID of the Type of the LevelGraphNode
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "LEVELGRAPHNODE")
@XmlRootElement(name = "LevelGraphNode")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tLevelGraphNode")
public class LevelGraphNode extends Node {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	// // TODO ENabeln oder XML auf Transient lassen
	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "LEVEL")
	// @JsonBackReference(value = "level-levelGraphNode")
	// // @XmlInverseReference(mappedBy = "LevelGraphNode")
	// @XmlTransient
	// private Level level;

	@Column(name = "LEVEL_ID")
	@XmlAttribute(name = "abstractionLevelId")
	private Long levelId;

	@Column(name = "LEVEL_DEPTH")
	@XmlAttribute(name = "abstractionDepth")
	private int levelDepth;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphnodes")
	@XmlInverseReference(mappedBy = "levelGraphNodes")
	private LevelGraph levelGraph;

	@Column(name = "LEVELGRAPH_ID")
	@XmlAttribute(name = "levelGraphId")
	private Long levelGraphId;

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.LAZY, mappedBy = "targetLevelGraphNode")
	@JsonManagedReference(value = "inLevelGraphRelations-targetLevelGraphNode")
	@XmlInverseReference(mappedBy = "targetLevelGraphNode")
	private List<LevelGraphRelation> inLevelGraphRelations;

	@OneToMany(cascade = { CascadeType.REMOVE, CascadeType.REFRESH }, fetch = FetchType.EAGER, mappedBy = "sourceLevelGraphNode")
	@JsonManagedReference(value = "outLevelGraphRelations-sourceLevelGraphNode")
	@XmlInverseReference(mappedBy = "sourceLevelGraphNode")
	private List<LevelGraphRelation> outLevelGraphRelations;

	@Column(name = "LEVELGRAPHNODETYPE")
	@XmlElement(name = "Type")
	private String levelGraphNodeType;

	@Column(name = "LEVELGRAPHNODETYPE_ID")
	@XmlAttribute(name = "levelGraphNodeTypeId")
	private long levelGraphNodeTypeId;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-nodeTemplate")
	@XmlTransient
	@JsonIgnore
	private List<NodeTemplate> nodeTemplates = new ArrayList<NodeTemplate>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "levelGraphNode")
	@JsonManagedReference(value = "levelGraphNode-relationshipTemplates")
	@XmlTransient
	@JsonIgnore
	private List<RelationshipTemplate> relationshipTemplates = new ArrayList<RelationshipTemplate>();

	@XmlTransient
	private ArrayList<LevelGraphRelation> outRefineRelations = new ArrayList<LevelGraphRelation>();

	@XmlTransient
	private ArrayList<LevelGraphRelation> outConnectRelations = new ArrayList<LevelGraphRelation>();

	@XmlTransient
	private ArrayList<LevelGraphRelation> outRefineEntryRelations = new ArrayList<LevelGraphRelation>();

	@XmlTransient
	private ArrayList<LevelGraphRelation> outRefineExitRelations = new ArrayList<LevelGraphRelation>();

	@XmlTransient
	private ArrayList<LevelGraphRelation> outRefineIncludeRelations = new ArrayList<LevelGraphRelation>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter - Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	// public Level getLevel() {
	// return level;
	// }
	//
	// public void setLevel(Level level) {
	// this.level = level;
	// }

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

	@JsonIgnore
	public ArrayList<LevelGraphRelation> getOutRefineRelations() {
		return outRefineRelations;
	}

	@JsonIgnore
	public void setOutRefineRelations(ArrayList<LevelGraphRelation> outRefineRelations) {
		this.outRefineRelations = outRefineRelations;
	}

	@JsonIgnore
	public ArrayList<LevelGraphRelation> getOutConnectRelations() {
		return outConnectRelations;
	}

	@JsonIgnore
	public void setOutConnectRelations(ArrayList<LevelGraphRelation> outConnectRelations) {
		this.outConnectRelations = outConnectRelations;
	}

	@JsonIgnore
	public ArrayList<LevelGraphRelation> getOutRefineEntryRelations() {
		return outRefineEntryRelations;
	}

	@JsonIgnore
	public void setOutRefineEntryRelations(ArrayList<LevelGraphRelation> outRefineEntryRelations) {
		this.outRefineEntryRelations = outRefineEntryRelations;
	}

	@JsonIgnore
	public ArrayList<LevelGraphRelation> getOutRefineExitRelations() {
		return outRefineExitRelations;
	}

	@JsonIgnore
	public void setOutRefineExitRelations(ArrayList<LevelGraphRelation> outRefineExitRelations) {
		this.outRefineExitRelations = outRefineExitRelations;
	}

	@JsonIgnore
	public ArrayList<LevelGraphRelation> getOutRefineIncludeRelations() {
		return outRefineIncludeRelations;
	}

	@JsonIgnore
	public void setOutRefineIncludeRelations(ArrayList<LevelGraphRelation> outRefineIncludeRelations) {
		this.outRefineIncludeRelations = outRefineIncludeRelations;
	}

	public void splitRelations() {

		for (LevelGraphRelation levelGraphRelation : this.outLevelGraphRelations) {
			if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.REFINE_TO)) {
				this.outRefineRelations.add(levelGraphRelation);
			} else if (levelGraphRelation.getLevelGraphRelationType().equals(LevelGraphRelationType.CONNECT_OVER_TO)) {
				this.outConnectRelations.add(levelGraphRelation);
			}
		}

	}

	public void splitFragmentRelations() {

		for (LevelGraphRelation levelGraphRelation : this.outLevelGraphRelations) {
			if (levelGraphRelation.isEntryPoint() && levelGraphRelation.isExitPoint()) {
				this.outRefineEntryRelations.add(levelGraphRelation);
				this.outRefineExitRelations.add(levelGraphRelation);
			} else if (levelGraphRelation.isEntryPoint() && !levelGraphRelation.isExitPoint()) {
				this.outRefineEntryRelations.add(levelGraphRelation);
			} else if (!levelGraphRelation.isEntryPoint() && levelGraphRelation.isExitPoint()) {
				this.outRefineExitRelations.add(levelGraphRelation);
			} else {
				this.outRefineIncludeRelations.add(levelGraphRelation);
			}
		}

	}

}
