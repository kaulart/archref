package de.arthurkaul.archref.model.graph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.arthurkaul.archref.constants.Constants;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Point> - A point in a coordinate system used for drawing
 *
 * @filed - Long id - ID of the point
 * @field - float x - X-Position in a Cartesian coordinate system
 * @field - float y - Y-Position in a Cartesian coordinate system
 * @filed - Path path - path in which the point is used
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "POINT")
public class Point {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "long")
	@GenericGenerator(name = "long", strategy = "de.arthurkaul.archref.UseExistingOrGenerateIdGeneratorLong")
	private Long id;

	@Column(name = "X")
	private float x = Constants.NODEWIDTH / 2;

	@Column(name = "Y")
	private float y = Constants.NODEHEIGHT / 2;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PATH_ID")
	@JsonBackReference(value = "path-point")
	private Path path;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Path getPath() {
		return path;
	}

	public void setPath(Path path) {
		this.path = path;
	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method clone() - create a deep copy of the Point
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public Point clone(Path path) {
		Point point = new Point();
		point.setX(this.x);
		point.setY(this.y);
		point.setPath(this.path);
		return point;
	}

}
