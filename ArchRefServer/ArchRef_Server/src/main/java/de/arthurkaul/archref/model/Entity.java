package de.arthurkaul.archref.model;

import java.util.Collection;
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

@javax.persistence.Entity
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@Table(name = "ENTITY")
public class Entity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "NAME")
	private String name;

	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="entity")
	@JsonManagedReference (value="entity-expectedProperties")
	private Collection<Property> expectedProperties;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="entity")
	@JsonManagedReference (value="entity-providedProperties")
	private Collection<Property> providedProperties;
	
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

	public Collection<Property> getExpectedProperties() {
		return expectedProperties;
	}

	public void setExpectedProperties(Collection<Property> expectedProperties) {
		this.expectedProperties = expectedProperties;
	}

	public Collection<Property> getProvidedProperties() {
		return providedProperties;
	}

	public void setProvidedProperties(Collection<Property> providedProperties) {
		this.providedProperties = providedProperties;
	}
	
}
