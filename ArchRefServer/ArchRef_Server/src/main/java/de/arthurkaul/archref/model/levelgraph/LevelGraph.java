package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.topology.TopologyTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @data - LevelGraph Data Model - LevelGraph Model is used for the refinement
 *       of TopologyTemplate Data Models
 *
 * @fields - id: number - ID of the LevelGraph
 * @fields - name: string - Name of the LevelGraph
 * @fields - levels: Level[] - Array of the different levels of a LevelGraph
 * @fields - levelGraphNodes: LevelGraphNode[] - Array of all LevelGraphNodes in
 *         the LevelGraph
 * @fields - levelGraphRelations: LevelGraphRelation[] - Array of all
 *         LevelGraphRelations in the LevelGraph
 * @fields - topologyTemplates: TopologyTemplate[] - Array of all
 *         TopologyTemplates which were created/generated with the LevelGraph
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

	// private Long levelGraphMatrix[][][];
	// private Long levelGraphRefineToMatrix[][][];
	// private Long levelGraphConnectToMatrix[][][];
	// private Long levelGraphHostedOnMatrix[][][];

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levels")
	private Collection<Level> levels;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphnodes")
	private Collection<LevelGraphNode> levelGraphNodes;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphrelation")
	private Collection<LevelGraphRelation> levelGraphRelations;

	@ManyToMany
	@JoinTable(name = "LEVELGRAPH_TOPOLOGYTEMPLATE", joinColumns = @JoinColumn(name = "LEVELGRAPH_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "TOPOLOGY_ID", referencedColumnName = "ID"))
	private Collection<TopologyTemplate> topologyTemplates;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Collection<Level> getLevels() {
		return levels;
	}

	public void setLevels(Collection<Level> levels) {
		this.levels = levels;
	}

	public Collection<LevelGraphNode> getLevelGraphNodes() {
		return levelGraphNodes;
	}

	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
		this.levelGraphNodes = levelGraphNodes;
	}

	public Collection<LevelGraphRelation> getLevelGraphRelations() {
		return levelGraphRelations;
	}

	public void setLevelGraphRelations(Collection<LevelGraphRelation> levelGraphRelations) {
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

	public Collection<TopologyTemplate> getTopologyTemplates() {
		return topologyTemplates;
	}

	public void setTopologyTemplates(Collection<TopologyTemplate> topologyTemplates) {
		this.topologyTemplates = topologyTemplates;
	}

	public void constructLevelGraphMatrix() {

		// TODO
	}

}
