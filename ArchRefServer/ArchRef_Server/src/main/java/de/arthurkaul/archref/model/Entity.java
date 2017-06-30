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
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlIDExtension;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Entity> - Superclass for all entities like <LevelGraphNodes>, <NodeType>, <NodeTemplate>. etc. if you want to extend the data of all this objects for example with metrics put this data as
 *        fields into this class like the expected and provided properties.
 *
 * @field - Long id - ID of the Entity
 * @field - String name - Name of the Entity
 * @field - List<ExpectedProperty> expectedProperties - List of expected properties of the Entity
 * @field - List<ProvidedProperty> providedProperties - List of provided properties of the Entity
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@javax.persistence.Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "ENTITY")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tEntity")
public class Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	@Column(name = "ID")
	@XmlAttribute(name = "id")
	@XmlIDExtension
	private Long id;

	@Column(name = "NAME")
	@XmlAttribute(name = "name")
	private String name = "Unnamed";

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "entityExpected")
	@JsonManagedReference(value = "entity-expectedProperties")
	@XmlElementWrapper(name = "ExpectedProperties")
	@XmlElement(name = "ExpectedProperty")
	private List<ExpectedProperty> expectedProperties = new ArrayList<ExpectedProperty>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "entityProvided")
	@JsonManagedReference(value = "entity-providedProperties")
	@XmlElementWrapper(name = "ProvidedProperties")
	@XmlElement(name = "ProvidedProperty")
	private List<ProvidedProperty> providedProperties = new ArrayList<ProvidedProperty>();

	@Column(name = "ICON_PATH")
	@XmlTransient
	private String icon = "/assets/img/nodeTypeDefault.png";

	@JsonIgnore
	@XmlTransient
	private Long tempId;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	public Entity clone() {
		Entity entity = new Entity();
		entity.setIcon(this.icon);
		entity.setName(this.name);
		for (ExpectedProperty property : this.expectedProperties) {
			entity.getExpectedProperties().add(property.clone());
		}
		for (ProvidedProperty property : this.providedProperties) {
			entity.getProvidedProperties().add(property.clone());
		}
		return entity;
	}

	public Long getTempId() {
		return tempId;
	}

	public void setTempId(Long tempId) {
		this.tempId = tempId;
	}

}
