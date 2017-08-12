package de.arthurkaul.archref.model.metrics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import de.arthurkaul.archref.model.Base;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Property> - Properties are name value pairs
 *
 * @field - Long id - Id of the Property
 * @field - String name - Name of the Property
 * @field - String value - Value of the Property
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "PROPERTY")
@XmlRootElement(name = "Property")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tProperty")
public class Property extends Base {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "NAME")
	@XmlAttribute(name = "name", required = true)
	private String name;

	@Column(name = "VALUE")
	@XmlAttribute(name = "value", required = true)
	private String value;

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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method clone() - create a deep copy of the Property
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public Property clone() {
		Property property = new Property();
		property.setName(this.name);
		property.setValue(this.value);
		return property;
	}
}
