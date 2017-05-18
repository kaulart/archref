package de.arthurkaul.archref.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Point {
	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "X")
	private Integer x;
	@Column(name = "Y")
	private Integer y;
	
	@ManyToOne(fetch=FetchType.LAZY)	
	@JoinColumn(name="PATH_ID")
	@JsonBackReference (value="path-point")
	private Path path;

	public Integer getX() {
		return x;
	}
	public void setX(Integer x) {
		this.x = x;
	}
	public Integer getY() {
		return y;
	}
	public void setY(Integer y) {
		this.y = y;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

}
