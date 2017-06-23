package de.arthurkaul.archref.model.graph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Node - Superclass for all models which should be displayed as rectangles in GraphModellerComponents. It extends the entity class.
 *
 * @class Entity
 * @superField - Long id - ID of the RelationshipTemplate
 * @superField - String name - Name of the RelationshipTemplate
 * @superField - List<ExpectedProperty> expectedProperties - Array of expected properties of the Node
 * @superField - List<ProvidedProperty> providedProperties - Array of provided properties of the Node
 *
 * @field - float x - x Position of the left upper corner of a rectangle
 * @field - float y - y Position of the left upper corner of a rectangle
 * @field - float width - Width of the rectangle
 * @field - float height - Height of the rectangle
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "NODE")
public class Node extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	@Column(name = "X")
	private float x;

	@Column(name = "Y")
	private float y;

	@Column(name = "WIDTH")
	private float width;

	@Column(name = "HEIGHT")
	private float height;

	@JsonIgnore
	private boolean refined;

	@JsonIgnore
	private boolean visited;

	private int depthBFS;

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

	public boolean isVisited() {
		return visited;
	}

	public void setVisited(boolean visited) {
		this.visited = visited;
	}

	public int getDepthBFS() {
		return depthBFS;
	}

	public void setDepthBFS(int depthBFS) {
		this.depthBFS = depthBFS;
	}

}
