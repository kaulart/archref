package de.arthurkaul.archref.model.types;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Property;
import de.arthurkaul.archref.model.Repository;


@Entity
@Table(name="RELATIONSHIPTYPE")
public class RelationshipType{
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@Column(name="ICON_PATH")
	@NotNull
	private String icon;

	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="relationshipType")
	@JsonManagedReference (value="relationshipType-property")
	private Collection<Property> providedProperties;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY_ID")
	@JsonBackReference (value="repository-relationshiptype")
	private Repository repository;
	
	@Column(name="REPOSITORY_ID")
	private Long repositoryId;

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

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Collection<Property> getProvidedProperties() {
		return providedProperties;
	}

	public void setProvidedProperties(Collection<Property> providedProperties) {
		this.providedProperties = providedProperties;
	}

	public Long getRepositoryId() {
		return repositoryId;
	}

	public void setRepositoryId(Long repositoryId) {
		this.repositoryId = repositoryId;
	}

	public Repository getRepository() {
		return repository;
	}

	public void setRepository(Repository repository) {
		this.repository = repository;
	}

}
