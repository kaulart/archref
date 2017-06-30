package de.arthurkaul.archref.model.graph;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.arthurkaul.archref.model.Constants;
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Node> - Superclass for all models which should be displayed as rectangles. It extends the <Entity> class.
 *
 * @field - float x - x Position of the left upper corner of a rectangle
 * @field - float y - y Position of the left upper corner of a rectangle
 * @field - float width - Width of the rectangle
 * @field - float height - Height of the rectangle
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@javax.persistence.Entity
@Table(name = "NODE")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tNode")
public class Node extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	@Column(name = "X")
	@XmlAttribute(name = "x")
	private float x = 0.0f;

	@Column(name = "Y")
	@XmlAttribute(name = "y")
	private float y = 0.0f;;

	@Column(name = "WIDTH")
	@XmlAttribute(name = "width")
	private float width = Constants.NODEWIDTH;

	@Column(name = "HEIGHT")
	@XmlAttribute(name = "height")
	private float height = Constants.NODEHEIGHT;

	@JsonIgnore
	@XmlTransient
	private boolean refined = false;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}

	public float getWidth() {
		return width;
	}

	public void setWidth(float width) {
		this.width = width;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}

	public boolean isRefined() {
		return refined;
	}

	public void setRefined(boolean refined) {
		this.refined = refined;
	}

	@Override
	public Node clone() {
		Node node = new Node();
		node.setIcon(this.getIcon());
		node.setName(this.getName());
		for (ExpectedProperty property : this.getExpectedProperties()) {
			node.getExpectedProperties().add(property.clone());
		}
		for (ProvidedProperty property : this.getProvidedProperties()) {
			node.getProvidedProperties().add(property.clone());
		}
		node.setHeight(this.height);
		node.setWidth(this.width);
		node.setX(this.x);
		node.setY(this.y);

		return node;
	}

}
