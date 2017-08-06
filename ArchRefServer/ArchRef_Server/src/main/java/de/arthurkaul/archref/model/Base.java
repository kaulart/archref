package de.arthurkaul.archref.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlIDExtension;
import org.hibernate.annotations.GenericGenerator;

@javax.persistence.Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "BASE")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tBase")
public class Base {

	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "long")
	@GenericGenerator(name = "long", strategy = "de.arthurkaul.archref.UseExistingOrGenerateIdGeneratorLong")
	@XmlAttribute(name = "id")
	@XmlIDExtension
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
