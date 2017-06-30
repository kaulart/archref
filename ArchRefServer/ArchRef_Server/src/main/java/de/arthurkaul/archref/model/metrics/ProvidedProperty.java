package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <ProvidedProperty> - ProvidedProperties are name value pairs which are provided through the owner. Inherited from <Property>
 *
 * @field - <Entity> entityProvided - owner of the Property
 * @field - Long entityProvidedId - ID of the owner of the Property
 * 
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "PROVIDED_PROPERTY")
@XmlRootElement(name = "ProvidedProperty")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tProvidedProperty")
public class ProvidedProperty extends Property {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYPROVIDED")
	@JsonBackReference(value = "entity-providedProperties")
	@XmlInverseReference(mappedBy = "providedProperties")
	private de.arthurkaul.archref.model.Entity entityProvided;

	@Column(name = "ENTITYPROVIDED_ID")
	@XmlAttribute(name = "entityProvidedId")
	private Long entityProvidedId;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	public ProvidedProperty clone() {
		ProvidedProperty property = new ProvidedProperty();
		property.setName(this.getName());
		property.setValue(this.getValue());
		return property;
	}

}
