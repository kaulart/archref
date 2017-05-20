package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class LevelGraph {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;

	@Column(name="NUMBER_OF_LEVELS")
	private Integer numberOfLevels;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraph")
	@JsonManagedReference (value="levelgraph-level")
	private Collection<Level> levels;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraph")
	@JsonManagedReference (value="levelgraph-levelgraphnodes")
	private Collection<LevelGraphNode> levelGraphNodes;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraph")
	@JsonManagedReference (value="levelgraph-levelgraphrelation")
	private Collection<LevelGraphRelation> levelGraphRelations;
	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraph")
//	@JsonManagedReference (value="levelgraph-topologytemplate")
//	private Collection<TopologyTemplate> topologyTemplates;
	
	
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

	public Integer getNumberOfLevels() {
		return numberOfLevels;
	}

	public void setNumberOfLevels(Integer numberOfLevels) {
		this.numberOfLevels = numberOfLevels;
	}

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


}
