package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;

@javax.persistence.Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "ENTITY")
public class Entity {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "entityExpected")
	@JsonManagedReference(value = "entity-expectedProperties")
	private List<ExpectedProperty> expectedProperties = new ArrayList<ExpectedProperty>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "entityProvided")
	@JsonManagedReference(value = "entity-providedProperties")
	private List<ProvidedProperty> providedProperties = new ArrayList<ProvidedProperty>();

	@Column(name = "ICON_PATH")
	private String icon;

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

	public List<ExpectedProperty> getExpectedProperties() {
		return expectedProperties;
	}

	public void setExpectedProperties(List<ExpectedProperty> expectedProperties) {
		this.expectedProperties = expectedProperties;
	}

	public List<ProvidedProperty> getProvidedProperties() {
		return providedProperties;
	}

	public void setProvidedProperties(List<ProvidedProperty> providedProperties) {
		this.providedProperties = providedProperties;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
