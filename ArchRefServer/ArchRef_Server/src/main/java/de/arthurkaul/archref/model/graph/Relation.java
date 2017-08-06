package de.arthurkaul.archref.model.graph;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Relation> - Superclass for all models which should be displayed as lines. It extends the <Entity> class.
 *
 * @field - Long sourceNodeId - ID of the source node of relation
 * @field - Long targetNodeId - ID of the target node of relation
 * @field - <Path> path - Path of the line from source node to target node
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "RELATION")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tRelation")
public class Relation extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "SOURCE_NODE_ID")
	@XmlAttribute(name = "sourceNodeId")
	private Long sourceNodeId;

	@Column(name = "TARGET_NODE_ID")
	@XmlAttribute(name = "targetNodeId")
	private Long targetNodeId;

	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "PATH_ID")
	@JsonManagedReference(value = "relation-path")
	@XmlElement(name = "Path")
	private Path path = new Path();

	@JsonIgnore
	@XmlTransient
	private boolean refined = false;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Long getSourceNodeId() {
		return sourceNodeId;
	}

	public void setSourceNodeId(Long sourceNodeId) {
		this.sourceNodeId = sourceNodeId;
	}

	public Long getTargetNodeId() {
		return targetNodeId;
	}

	public void setTargetNodeId(Long targetNodeId) {
		this.targetNodeId = targetNodeId;
	}

	public Path getPath() {
		return path;
	}

	public void setPath(Path path) {
		this.path = path;
	}

	public boolean isRefined() {
		return refined;
	}

	public void setRefined(boolean refined) {
		this.refined = refined;
	}

	public Relation clone() {
		Relation relation = new Relation();
		relation.setIcon(this.getIcon());
		relation.setName(this.getName());
		for (ExpectedProperty property : this.getExpectedProperties()) {
			relation.getExpectedProperties().add(property.clone());
		}
		for (ProvidedProperty property : this.getProvidedProperties()) {
			relation.getProvidedProperties().add(property.clone());
		}
		relation.setPath(this.path.clone());
		relation.setSourceNodeId(this.sourceNodeId);
		relation.setTargetNodeId(this.targetNodeId);
		return relation;
	}

}
