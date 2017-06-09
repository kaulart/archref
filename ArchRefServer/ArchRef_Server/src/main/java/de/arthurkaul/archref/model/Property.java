package de.arthurkaul.archref.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.model.types.RelationshipType;

@Entity

public class Property {
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	@NotNull
	private String name;
	
	@Column(name="VALUE")
	@NotNull
	private String value;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "NODETYPEID")
	@JsonBackReference (value="nodeType-property")
	private NodeType nodeType;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RELATIONSHIPTYPEID")
	@JsonBackReference (value="relationshipType-property")
	private RelationshipType relationshipType;
	
//	@Column(name="NODETEMPLATEID")
//	private NodeTemplate nodeTemplate;
//	
//	@Column(name="RELATIONSHIPTEMPLATEID")
//	private RelationshipTemplate relationshipTemplate;
//	
//	@Column(name="FRAGMENTNODEID")
//	private FragmentNode fragmentNode;
//	
//	@Column(name="LEVELGRAPHNODEID")
//	private LevelGraphNode levelGraphNode;
//	
//	@Column(name="LEVELGRAPHRELATIONID")
//	private LevelGraphRelation levelGraphRelation;

//	@Column(name="PROPERTCONSTRAINTTYPE")
//	private String propertyConstraintType;
	
//	@Column(name="CONSTRAINTVALUES")
//	private Collection<String> constrainValues;
	
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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public NodeType getNodeType() {
		return nodeType;
	}

	public void setNodeType(NodeType nodeType) {
		this.nodeType = nodeType;
	}

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setRelationshipType(RelationshipType relationshipType) {
		this.relationshipType = relationshipType;
	}
//
//	public NodeTemplate getNodeTemplate() {
//		return nodeTemplate;
//	}
//
//	public void setNodeTemplate(NodeTemplate nodeTemplate) {
//		this.nodeTemplate = nodeTemplate;
//	}
//
//	public RelationshipTemplate getRelationshipTemplate() {
//		return relationshipTemplate;
//	}
//
//	public void setRelationshipTemplate(RelationshipTemplate relationshipTemplate) {
//		this.relationshipTemplate = relationshipTemplate;
//	}
//
//	public FragmentNode getFragmentNode() {
//		return fragmentNode;
//	}
//
//	public void setFragmentNode(FragmentNode fragmentNode) {
//		this.fragmentNode = fragmentNode;
//	}
//
//	public LevelGraphNode getLevelGraphNode() {
//		return levelGraphNode;
//	}
//
//	public void setLevelGraphNode(LevelGraphNode levelGraphNode) {
//		this.levelGraphNode = levelGraphNode;
//	}
//
//	public LevelGraphRelation getLevelGraphRelation() {
//		return levelGraphRelation;
//	}
//
//	public void setLevelGraphRelation(LevelGraphRelation levelGraphRelation) {
//		this.levelGraphRelation = levelGraphRelation;
//	}

//	public String getPropertyConstraintType() {
//		return propertyConstraintType;
//	}

//	public void setPropertyConstraintType(String propertyConstraintType) {
//		this.propertyConstraintType = propertyConstraintType;
//	}
}
