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
 * @class - <ExpectedProperty> - ExpectedProperties are name value pairs which should be fulfilled by a specific kind of the owner. Inherited from <Property>
 *
 * @field - <Entity> entityProvided - owner of the ExpectedProperty
 * @field - Long entityProvidedId - ID of the owner of the ExpectedProperty
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "EXPECTED_PROPERTY")
@XmlRootElement(name = "ExpectedProperty")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tExpectedProperty")
public class ExpectedProperty extends Property {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENTITYEXPECTED")
	@JsonBackReference(value = "entity-expectedProperties")
	@XmlInverseReference(mappedBy = "expectedProperties")
	private de.arthurkaul.archref.model.Entity entityExpected;

	@Column(name = "ENTITYEXPECTED_ID")
	@XmlAttribute(name = "entityExpectedId", required = true)
	private Long entityExpectedId;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method clone() - create a deep copy of the ExpectedProperty
	 * 
	 ***************************************************************************************************************************************************************************************************/
	@Override
	public ExpectedProperty clone() {
		ExpectedProperty property = new ExpectedProperty();
		property.setName(this.getName());
		property.setValue(this.getValue());
		return property;
	}

}
