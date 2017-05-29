package de.arthurkaul.archref.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity

public class Property {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@Column(name="VALUE")
	@NotNull
	private String value;

	@Column(name="PROPERTCONSTRAINTTYPE")
	private String propertyConstraintType;
	
	@Column(name="CONSTRAINTVALUES")
	private Collection<String> constrainValues;
	
	
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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getPropertyConstraintType() {
		return propertyConstraintType;
	}

	public void setPropertyConstraintType(String propertyConstraintType) {
		this.propertyConstraintType = propertyConstraintType;
	}
}
