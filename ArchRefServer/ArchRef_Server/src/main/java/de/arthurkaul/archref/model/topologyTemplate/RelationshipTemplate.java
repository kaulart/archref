package de.arthurkaul.archref.model.topologyTemplate;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.Property;
import de.arthurkaul.archref.model.PropertyConstraint;
import de.arthurkaul.archref.model.RelationshipConstraint;

@Entity
@Table(name="RELATIONSSHIP_TEMPLATE")
public class RelationshipTemplate {

	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String name;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="RELATIONSHIPTYPE_ID")
	private RelationshipType relationshipType;
	
	
	@ManyToMany
	@JoinTable(name="RELATIONSSHIPTEMPLATE_PROPERTY", joinColumns=@JoinColumn(name="RELATIONSHIPTEMPLATE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="PROPERTY_ID", referencedColumnName="ID"))
	private Collection<Property> propertyList;
	
	@ManyToMany
	@JoinTable(name="RELATIONSSHIPTEMPLATE_PROPERTYCONSTRAINT", joinColumns=@JoinColumn(name="RELATIONSHIPTEMPLATE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="PROPERTYCONSTRAINT_ID", referencedColumnName="ID"))
	private Collection<PropertyConstraint> propertyConstraintList;
	
	//TODO: Maybe a problem to Indicate what Type will be the source or target so implemented a Workaround 
	@Column(name="NODETEMPLATE_SOURCE_ID")
	@NotNull
	private Long sourceElementNodetype;
	
	@Column(name="REQUIREMENT_SOURCE_ID")
	private Long sourceElementRequirement; 
	
	@Column(name="NODETEMPLATE_TARGET_ID")
	@NotNull
	private Long targetElemenNodetype;
	
	@Column(name="REQUIREMENT_TARGET_ID")
	private Long targetElementRequirement; 
	
	@ManyToMany
	@JoinTable(name="RELATIONSSHIPTEMPLATE_RELATIONSHIPCONSTRAINT", joinColumns=@JoinColumn(name="RELATIONSHIPTEMPLATE_ID", referencedColumnName="ID"), inverseJoinColumns=@JoinColumn(name="RELATIONSHIPCONSTRAINT_ID", referencedColumnName="ID"))
	private Collection<RelationshipConstraint> relationshipConstraintList;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TOPOLOGYTEMPLATE_ID")
	@JsonBackReference(value="topologyTemplate-relationshipTemplate")
	private TopologyTemplate topologyTemplate;

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

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setNodeType(RelationshipType relationshipType) {
		this.relationshipType = relationshipType;
	}

	public Collection<Property> getPropertyList() {
		return propertyList;
	}

	public void setPropertyList(Collection<Property> propertyList) {
		this.propertyList = propertyList;
	}

	public Collection<PropertyConstraint> getPropertyConstraintList() {
		return propertyConstraintList;
	}

	public void setPropertyConstraintList(Collection<PropertyConstraint> propertyConstraintList) {
		this.propertyConstraintList = propertyConstraintList;
	}

	public Long getSourceElement() {
		return sourceElementNodetype;
	}

	public void setSourceElement(Long sourceElement) {
		this.sourceElementNodetype = sourceElement;
	}

	public Long getTargetElement() {
		return targetElemenNodetype;
	}

	public void setTargetElement(Long targetElement) {
		this.targetElemenNodetype = targetElement;
	}

	public Collection<RelationshipConstraint> getRelationshipConstraintList() {
		return relationshipConstraintList;
	}

	public void setRelationshipConstraintList(Collection<RelationshipConstraint> relationshipConstraintList) {
		this.relationshipConstraintList = relationshipConstraintList;
	}

	public Long getSourceElementRequirement() {
		return sourceElementRequirement;
	}

	public void setSourceElementRequirement(Long sourceElementRequirement) {
		this.sourceElementRequirement = sourceElementRequirement;
	}

	public Long getTargetElementRequirement() {
		return targetElementRequirement;
	}

	public void setTargetElementRequirement(Long targetElementRequirement) {
		this.targetElementRequirement = targetElementRequirement;
	}
	
}
