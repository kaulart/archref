package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="PROPERTY")
public class Property extends de.arthurkaul.archref.model.Entity {
	
	@Column(name="VALUE")
	@NotNull
	private String value;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYEXPECTED")
	@JsonBackReference (value="entity-expectedProperties")
	private de.arthurkaul.archref.model.Entity entityExpected;
	
	@Column(name="ENTITYEXPECTED_ID")
	private Long entityExpectedId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYPROVIDED")
	@JsonBackReference (value="entity-providedProperties")
	private de.arthurkaul.archref.model.Entity entityProvided;
	
	@Column(name="ENTITYPROVIDED_ID")
	private Long entityProvidedId;
	
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public de.arthurkaul.archref.model.Entity getEntityExpected() {
		return entityExpected;
	}

	public void setEntityExpected(de.arthurkaul.archref.model.Entity entityExpected) {
		this.entityExpected = entityExpected;
	}

	public Long getEntityExpectedId() {
		return entityExpectedId;
	}

	public void setEntityExpectedId(Long entityExpectedId) {
		this.entityExpectedId = entityExpectedId;
	}

	public de.arthurkaul.archref.model.Entity getEntityProvided() {
		return entityProvided;
	}

	public void setEntityProvided(de.arthurkaul.archref.model.Entity entityProvided) {
		this.entityProvided = entityProvided;
	}

	public Long getEntityProvidedId() {
		return entityProvidedId;
	}

	public void setEntityProvidedId(Long entityProvidedId) {
		this.entityProvidedId = entityProvidedId;
	}

}
