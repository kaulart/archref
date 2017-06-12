package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "PROVIDED_PROPERTY")
public class ProvidedProperty extends Property{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYPROVIDED")
	@JsonBackReference(value = "entity-providedProperties")
	private de.arthurkaul.archref.model.Entity entityProvided;

	@Column(name = "ENTITYPROVIDED_ID")
	private Long entityProvidedId;

}
