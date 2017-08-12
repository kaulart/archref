package de.arthurkaul.archref.model.graph;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.constants.Constants;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Path> - A list of points used for drawing paths in a view
 *
 * @field - Long id - ID of a path in a view
 * @field - String pathDataString - Specific representation of a path as a string so that SVG path/line elements can interpret the data
 * @field - List<Point> points - List of all point in a path
 * @filed - Relation relation - parent of the path
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "Path")
public class Path {

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

	@Column(name = "PATH_DATA_STRING")
	private String pathDataString = Constants.NODEWIDTH / 2 + "," + Constants.NODEHEIGHT / 2 + " " + Constants.NODEWIDTH / 2 + "," + Constants.NODEHEIGHT / 2;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "path")
	@JsonManagedReference(value = "path-point")
	private List<Point> points = new ArrayList<Point>(Arrays.asList(new Point(), new Point()));

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "path")
	@JsonBackReference(value = "relation-path")
	private Relation relation;

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

	public String getPathDataString() {
		return pathDataString;
	}

	public void setPathDataString(String pathDataString) {
		this.pathDataString = pathDataString;
	}

	public List<Point> getPoints() {
		return points;
	}

	public void setPoints(List<Point> points) {
		this.points = points;
	}

	public Relation getRelation() {
		return relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method clone() - create a deep copy of the Path
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public Path clone() {
		Path path = new Path();
		path.setPathDataString(this.pathDataString);
		path.points.clear();
		for (Point point : this.points) {
			path.getPoints().add(point.clone(path));
		}

		return path;
	}

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @method clone() - update the path data string
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public void updatePath() {
		this.pathDataString = "";
		for (Point point : this.points) {
			this.pathDataString = this.pathDataString + point.getX() + ',' + point.getY() + ' ';
		}
	}

}
