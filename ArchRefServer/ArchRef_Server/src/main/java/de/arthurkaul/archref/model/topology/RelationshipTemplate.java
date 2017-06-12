package de.arthurkaul.archref.model.topology;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import de.arthurkaul.archref.model.graph.Relation;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.types.RelationshipType;

@Entity
@Table(name="RELATIONSHIPTEMPLATE")
public class RelationshipTemplate extends Relation {
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPHNODE")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	private Long levelGraphNodeId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="RELATIONSHIPTYPE")
	private RelationshipType relationshipType;
	
	@Column(name = "RELATIONSHIPTYPE_ID")
	private Long relationshipTypeId;
	
	@ManyToMany
	@JoinTable(name = "NODETEMPLATE_RELATIONSHIPTEMPLATE", 
			joinColumns = @JoinColumn(name = "RELATIONSHIPTEMPLATE_ID", referencedColumnName = "ID"), 
			inverseJoinColumns = @JoinColumn(name = "NODETEMPLATE_ID", referencedColumnName = "ID"))
	private Collection<NodeTemplate> nodeTemplates;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TOPOLOGYTEMPLATE")
	@JsonBackReference(value="topologyTemplate-relationshipTemplate")
	private TopologyTemplate topologyTemplate;
	
	@Column(name = "TOPOLOGYTEMPLATE_ID")
	private Long topologyTemplateId;

	public RelationshipType getRelationshipType() {
		return relationshipType;
	}

	public void setNodeType(RelationshipType relationshipType) {
		this.relationshipType = relationshipType;
	}

	public Long getRelationshipTypeId() {
		return relationshipTypeId;
	}

	public void setRelationshipTypeId(Long relationshipTypeId) {
		this.relationshipTypeId = relationshipTypeId;
	}

	public TopologyTemplate getTopologyTemplate() {
		return topologyTemplate;
	}

	public void setTopologyTemplate(TopologyTemplate topologyTemplate) {
		this.topologyTemplate = topologyTemplate;
	}

	public Long getTopologyTemplateId() {
		return topologyTemplateId;
	}

	public void setTopologyTemplateId(Long topologyTemplateId) {
		this.topologyTemplateId = topologyTemplateId;
	}
	
}
