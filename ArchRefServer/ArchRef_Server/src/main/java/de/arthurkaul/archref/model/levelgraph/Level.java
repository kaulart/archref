package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Level {

	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="VALUE")
	@NotNull
	private Long value;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@Column(name="CHECKED")
	@NotNull
	private Boolean checked;
	
	@Column(name="Y")
	@NotNull
	private Integer y;
	
	@Column(name="HEIGHT")
	@NotNull
	private Integer height;
	
	@ManyToOne(fetch=FetchType.LAZY)	
	@JoinColumn(name="LEVELGRAPH_LEVEL_ID")
	@JsonBackReference (value="levelgraph-level")
	private LevelGraph levelGraph;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="sourceLevel")
	@JsonManagedReference (value="level-sourceLevelGraphRelation")
	private Collection<LevelGraphRelation> outLevelGraphRelations;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="sourceLevel")
	@JsonManagedReference (value="level-sourceLevelGraphRelation")
	private Collection<LevelGraphRelation> inLevelGraphRelations;
	
//	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="level")
//	@JsonManagedReference (value="level-levelGraphNode")
//	private Collection<LevelGraphNode> levelGraphNodes;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	public Integer getY() {
		return y;
	}
	public void setY(Integer y) {
		this.y = y;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Long getValue() {
		return value;
	}
	public void setValue(Long value) {
		this.value = value;
	}

	public LevelGraph getLevelGraph() {
		return levelGraph;
	}
	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}
	public Collection<LevelGraphRelation> getOutLevelGraphRelations() {
		return outLevelGraphRelations;
	}
	public void setOutLevelGraphRelations(Collection<LevelGraphRelation> outLevelGraphRelations) {
		this.outLevelGraphRelations = outLevelGraphRelations;
	}
	public Collection<LevelGraphRelation> getInLevelGraphRelations() {
		return inLevelGraphRelations;
	}
	public void setInLevelGraphRelations(Collection<LevelGraphRelation> inLevelGraphRelations) {
		this.inLevelGraphRelations = inLevelGraphRelations;
	}
//	public Collection<LevelGraphNode> getLevelGraphNodes() {
//		return levelGraphNodes;
//	}
//	public void setLevelGraphNodes(Collection<LevelGraphNode> levelGraphNodes) {
//		this.levelGraphNodes = levelGraphNodes;
//	}
	
}
