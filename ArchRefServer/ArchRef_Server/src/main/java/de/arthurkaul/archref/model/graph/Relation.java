package de.arthurkaul.archref.model.graph;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Path;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - Relation - Superclass for all models which should be displayed as lines in GraphModellerComponents. It extends the entity class.
 *
 * @class Entity
 * @superField - Long id - ID of the Relation
 * @superField - String name: string - Name of the Relation
 * @superField - List<ExpectedProperty> expectedProperties - Array of expected properties of the Relation
 * @superField - List<ProvidedProperty> providedProperties - Array of provided properties of the Relation
 *
 * @field - Long sourceNodeId - ID of the Source Node of relation
 * @field - Long targetNodeId - ID of the Target Node of relation
 * @field - Path path - Path of the line from source node to target node
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "RELATION")
public class Relation extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@Column(name = "SOURCE_NODE_ID")
	private Long sourceNodeId;

	@Column(name = "TARGET_NODE_ID")
	private Long targetNodeId;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "PATH_ID")
	@JsonManagedReference(value = "relation-path")
	private Path path;

	@JsonIgnore
	private boolean refined;

	@JsonIgnore
	private boolean visited;

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

	public boolean isVisited() {
		return visited;
	}

	public void setVisited(boolean visited) {
		this.visited = visited;
	}

	public boolean isRefined() {
		return refined;
	}

	public void setRefined(boolean refined) {
		this.refined = refined;
	}

}
