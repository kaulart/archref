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
	@JsonManagedReference
	private Collection<Level> levels;
	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphNodeType> levelGraphNodeTypes;
//	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphFragmentNode> levelGraphFragmentNodeList;
//	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphRelationType> levelGraphRelationTypeList;
//	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphConnectedToRelation> levelGraphConnectToRelationList;
//	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphHostedOnRelation> levelGraphHostedOnRelationList;
//	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="repositoryNodeType")
//	@JsonManagedReference
//	private Collection<LevelGraphRefineToRlation> levelslevelGraphRefineToRelationList;
	
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

//	public Collection<LevelGraphNodeType> getLevelGraphNodeTypes() {
//		return levelGraphNodeTypes;
//	}
//
//	public void setLevelGraphNodeTypes(Collection<LevelGraphNodeType> levelGraphNodeTypes) {
//		this.levelGraphNodeTypes = levelGraphNodeTypes;
//	}
//
//	public Collection<LevelGraphFragmentNode> getLevelGraphFragmentNodeList() {
//		return levelGraphFragmentNodeList;
//	}
//
//	public void setLevelGraphFragmentNodeList(Collection<LevelGraphFragmentNode> levelGraphFragmentNodeList) {
//		this.levelGraphFragmentNodeList = levelGraphFragmentNodeList;
//	}
//
//	public Collection<LevelGraphRelationType> getLevelGraphRelationTypeList() {
//		return levelGraphRelationTypeList;
//	}
//
//	public void setLevelGraphRelationTypeList(Collection<LevelGraphRelationType> levelGraphRelationTypeList) {
//		this.levelGraphRelationTypeList = levelGraphRelationTypeList;
//	}
//
//	public Collection<LevelGraphConnectedToRelation> getLevelGraphConnectToRelationList() {
//		return levelGraphConnectToRelationList;
//	}
//
//	public void setLevelGraphConnectToRelationList(Collection<LevelGraphConnectedToRelation> levelGraphConnectToRelationList) {
//		this.levelGraphConnectToRelationList = levelGraphConnectToRelationList;
//	}
//
//	public Collection<LevelGraphHostedOnRelation> getLevelGraphHostedOnRelationList() {
//		return levelGraphHostedOnRelationList;
//	}
//
//	public void setLevelGraphHostedOnRelationList(Collection<LevelGraphHostedOnRelation> levelGraphHostedOnRelationList) {
//		this.levelGraphHostedOnRelationList = levelGraphHostedOnRelationList;
//	}
//
//	public Collection<LevelGraphRefineToRlation> getLevelslevelGraphRefineToRelationList() {
//		return levelslevelGraphRefineToRelationList;
//	}
//
//	public void setLevelslevelGraphRefineToRelationList(Collection<LevelGraphRefineToRlation> levelslevelGraphRefineToRelationList) {
//		this.levelslevelGraphRefineToRelationList = levelslevelGraphRefineToRelationList;
//	}

}
