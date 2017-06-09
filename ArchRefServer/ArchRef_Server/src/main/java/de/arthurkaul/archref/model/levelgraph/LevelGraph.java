package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.topology.TopologyTemplate;

@Entity
@Table(name = "LEVELGRAPH")
public class LevelGraph {

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levels")
	private Collection<Level> levels;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphnodes")
	private Collection<LevelGraphNode> levelGraphNodes;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-levelgraphrelation")
	private Collection<LevelGraphRelation> levelGraphRelations;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "levelGraph")
	@JsonManagedReference(value = "levelgraph-topologytemplate")
	private Collection<TopologyTemplate> topologyTemplates;


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

	public Collection<TopologyTemplate> getTopologyTemplates() {
		return topologyTemplates;
	}

	public void setTopologyTemplates(Collection<TopologyTemplate> topologyTemplates) {
		this.topologyTemplates = topologyTemplates;
	}

}
