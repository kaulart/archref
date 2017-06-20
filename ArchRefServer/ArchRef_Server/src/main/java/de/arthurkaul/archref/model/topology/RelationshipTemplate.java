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

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import de.arthurkaul.archref.model.graph.Relation;
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.model.types.RelationshipType;

@Entity
@Table(name = "RELATIONSHIPTEMPLATE")
public class RelationshipTemplate extends Relation {

	/*******************************************************************************************************************************************************************************************************
	 *
	 * @data - RelationshipTemplate Data Model - A relation of a
	 *       RelationshipTemplate
	 *
	 * @Entity
	 * @superFields - id: number - ID of the RelationshipTemplate
	 * @superFields - name: string - Name of the RelationshipTemplate
	 * @superFields - expectedProperties: ExpectedProperty[] - Array of expected
	 *              properties of the RelationshipTemplate
	 * @superFields - providedProperties: ProvidedProperty[] - Array of provided
	 *              properties of the RelationshipTemplate
	 *
	 * @Relation
	 * @superFields - sourceNodeId: number - ID of the Source Node of
	 *              RelationshipTemplate
	 * @superFields - targetNodeId: number - ID of the Target Node of
	 *              RelationshipTemplate
	 * @superFields - path: Path - Path of the line from source node to target
	 *              node
	 *
	 * @fields - levelGraphNode: LevelGraphNode - LevelGraph Node from which
	 *         this RelationshipTemplate is derived
	 * @fields - levelGraphNodeId: number - ID of the LevelGraph Node form which
	 *         the RelationshipTemplate is derived
	 * @fields - relationshipType: RelationshipType - RelationshipType of the
	 *         RelationshipTemplate
	 * @fields - relationshipTypeId: number - ID of the RelationshipType
	 * @fields - sourceNodeTemplate: NodeTemplate - Source and Target
	 *         NodeTemplate of the RelationshipTemplate
	 * @fields - targetNodeTemplate: NodeTemplate - Source and Target
	 *         NodeTemplate of the RelationshipTemplate
	 * @fields - topologyTemplate: TopologyTemplate - TopologyTemplate of the
	 *         RelationshipTemplate
	 * @fields - topologyTemplateId: number - ID of the TopologyTemplate
	 *
	 * @author Arthur Kaul
	 *
	 ******************************************************************************************************************************************************************************************************/
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPHNODE")
	@JsonBackReference(value = "levelGraphNode-relationshipTemplates")
	private LevelGraphNode levelGraphNode;

	@Column(name = "LEVELGRAPHNODE_ID")
	private Long levelGraphNodeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RELATIONSHIPTYPE")
	@JsonBackReference(value = "relationshipType-relationshipTemplate")
	private RelationshipType relationshipType;

	@Column(name = "RELATIONSHIPTYPE_ID")
	private Long relationshipTypeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOURCE_NODETEMPLATE")
	@JsonBackReference(value = "inRelationshipTemplates-sourceNodeTemplate")
//	@Cascade({ CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH })
	private NodeTemplate sourceNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_NODETEMPLATE")
	@JsonBackReference(value = "outRelationshipTemplates-targetNodeTemplate")
//	@Cascade({ CascadeType.MERGE, CascadeType.REFRESH, CascadeType.SAVE_UPDATE, CascadeType.DETACH })
	private NodeTemplate targetNodeTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TOPOLOGYTEMPLATE")
	@JsonBackReference(value = "topologyTemplate-relationshipTemplate")
	private TopologyTemplate topologyTemplate;

	@Column(name = "TOPOLOGYTEMPLATE_ID")
	private Long topologyTemplateId;

	/***************************************************************************************************************************************************************************************************
	 * 
	 * Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

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
