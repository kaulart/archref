package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "EXPECTED_PROPERTY")
public class ExpectedProperty extends Property {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYEXPECTED")
	@JsonBackReference(value = "entity-expectedProperties")
	private de.arthurkaul.archref.model.Entity entityExpected;

	@Column(name = "ENTITYEXPECTED_ID")
	private Long entityExpectedId;

	public Long getEntityExpectedId() {
		return entityExpectedId;
	}

	public void setEntityExpectedId(Long entityExpectedId) {
		this.entityExpectedId = entityExpectedId;
	}

	public de.arthurkaul.archref.model.Entity getEntityExpected() {
		return entityExpected;
	}

	public void setEntityExpected(de.arthurkaul.archref.model.Entity entityExpected) {
		this.entityExpected = entityExpected;
	}

}
