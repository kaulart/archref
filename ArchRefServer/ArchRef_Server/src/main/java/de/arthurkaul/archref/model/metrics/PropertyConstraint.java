package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity

public class PropertyConstraint {
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
}
