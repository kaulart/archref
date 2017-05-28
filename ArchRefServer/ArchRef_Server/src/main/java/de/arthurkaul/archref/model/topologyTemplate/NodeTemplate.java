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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.Policy;
import de.arthurkaul.archref.model.Property;
import de.arthurkaul.archref.model.PropertyConstraint;
import de.arthurkaul.archref.model.Requirement;
import de.arthurkaul.archref.model.capability.Capability;

@Entity
@Table(name = "NODE_TEMPLATE")
public class NodeTemplate {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NODETYPE_ID")
	private NodeType nodeType;

	@Column(name = "MININSTANCES")
	private Integer minInstances;

	@Column(name = "MAXINSTANCES")
	private Integer maxInstances1;

	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_PROPERTY", joinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "PROPERTY_ID", referencedColumnName = "ID"))
	private Collection<Property> propertyList;

	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_PROPERTYCONSTRAINT", joinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "PROPERTYCONSTRAINT_ID", referencedColumnName = "ID"))
	private Collection<PropertyConstraint> propertyConstraintList;

	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_REQUIREMENT", joinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "REQUIREMENT_ID", referencedColumnName = "ID"))
	private Collection<Requirement> requirementList;

	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_CAPABILITY", joinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "CAPABILITY_ID", referencedColumnName = "ID"))
	private Collection<Capability> capabilityList;

	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_POLICY", joinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "POLICY_ID", referencedColumnName = "ID"))
	private Collection<Policy> policyList;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE_NODE_ID")
	@JsonBackReference(value="topologyTemplate-nodeTemplate")
	private TopologyTemplate topologyTemplate;

	@Column(name = "X")
	private Integer x;

	@Column(name = "Y")
	private Integer y;

	@Column(name = "WIDTH")
	private Integer width;

	@Column(name = "HEIGHT")
	private Integer height;

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

	public NodeType getNodeType() {
		return nodeType;
	}

	public void setNodeType(NodeType nodeType) {
		this.nodeType = nodeType;
	}

	public Integer getMinInstances() {
		return minInstances;
	}

	public void setMinInstances(Integer minInstances) {
		this.minInstances = minInstances;
	}

	public Integer getMaxInstances1() {
		return maxInstances1;
	}

	public void setMaxInstances1(Integer maxInstances1) {
		this.maxInstances1 = maxInstances1;
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

	public Collection<Requirement> getRequirementList() {
		return requirementList;
	}

	public void setRequirementList(Collection<Requirement> requirementList) {
		this.requirementList = requirementList;
	}

	public Collection<Capability> getCapabilityList() {
		return capabilityList;
	}

	public void setCapabilityList(Collection<Capability> capabilityList) {
		this.capabilityList = capabilityList;
	}

	public Collection<Policy> getPolicyList() {
		return policyList;
	}

	public void setPolicyList(Collection<Policy> policyList) {
		this.policyList = policyList;
	}

	public Integer getX() {
		return x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

}
