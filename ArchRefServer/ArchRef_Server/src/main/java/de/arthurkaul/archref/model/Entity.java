package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.model.topology.NodeTemplate;

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
@Table(name = "ENTITY")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tEntity")
public class Entity extends Base {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	@XmlTransient
	private Long tempId;

	@Transient
	@XmlTransient
	private ArrayList<NodeTemplate> entryNodeTemplates = new ArrayList<NodeTemplate>();

	@Transient
	@XmlTransient
	private ArrayList<NodeTemplate> exitNodeTemplates = new ArrayList<NodeTemplate>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	@JsonIgnore
	public Long getTempId() {
		return tempId;
	}

	@JsonIgnore
	public void setTempId(Long tempId) {
		this.tempId = tempId;
	}

	@JsonIgnore
	public ArrayList<NodeTemplate> getEntryNodeTemplates() {
		return entryNodeTemplates;
	}

	@JsonIgnore
	public void setEntryNodeTemplates(ArrayList<NodeTemplate> entryNodeTemplates) {
		this.entryNodeTemplates = entryNodeTemplates;
	}

	@JsonIgnore
	public ArrayList<NodeTemplate> getExitNodeTemplates() {
		return exitNodeTemplates;
	}

	@JsonIgnore
	public void setExitNodeTemplates(ArrayList<NodeTemplate> exitNodeTemplates) {
		this.exitNodeTemplates = exitNodeTemplates;
	}

}
