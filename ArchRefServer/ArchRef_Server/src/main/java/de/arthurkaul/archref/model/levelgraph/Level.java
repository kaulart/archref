package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Level {

	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="VALUE")
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
	@JoinColumn(name="LEVELGRAPH_ID")
	@JsonBackReference
	private LevelGraph levelGraph;
	
	
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
	public LevelGraph getLevelGraph() {
		return levelGraph;
	}
	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}
	public Long getValue() {
		return value;
	}
	public void setValue(Long value) {
		this.value = value;
	}
	
}
