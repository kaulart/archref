package de.arthurkaul.archref.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.graph.Relation;

@Entity
public class Path {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "PATH_DATA_STRING")
	private String pathDataString;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="path")
	@JsonManagedReference (value="path-point")
	private Collection<Point> points;
	
	@OneToOne(fetch=FetchType.LAZY, mappedBy="path")
	@JsonBackReference  (value="relation-path")
	private Relation relation;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPathDataString() {
		return pathDataString;
	}

	public void setPathDataString(String pathDataString) {
		this.pathDataString = pathDataString;
	}

	public Collection<Point> getPoints() {
		return points;
	}

	public void setPoints(Collection<Point> points) {
		this.points = points;
	}

	public Relation getRelation() {
		return relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
	}

}
