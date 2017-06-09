package de.arthurkaul.archref.model.graph;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Path;

@Entity
@Table(name = "RELATION")
public class Relation extends de.arthurkaul.archref.model.Entity {

	@Column(name = "SOURCE_NODE_ID")
	private Long sourceNodeId;
	
	@Column(name = "TARGET_NODE_ID")
	private Long targetNodeId;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="PATH_ID")
	@JsonManagedReference (value="levelgraphrelation-path")
	private Path path;

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
	
}
