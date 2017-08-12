package de.arthurkaul.archref.model.types;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <RelationshipType> - RelationshipType inherited from <Entity> it is the type of a <RelationshipTemplate> or of a <LevelGraphNode>
 *
 * @field - <Repository> repository - Repository of the RelationshipType
 * @field - String repositoryId - ID of the Repository of the RelationshipType
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@Entity
@Table(name = "RELATIONSHIPTYPE")
@XmlRootElement(name = "RelationshipType")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tRelationshipType")
public class RelationshipType extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "REPOSITORY", updatable = false)
	@JsonBackReference(value = "repository-relationshipType")
	@XmlInverseReference(mappedBy = "relationshipTypes")
	private Repository repository;

	@Column(name = "REPOSITORY_ID")
	@XmlAttribute(name = "repositoryRef", required = true)
	private String repositoryId;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "relationshipType")
	@JsonManagedReference(value = "relationshipType-relationshipTemplate")
	@JsonIgnore
	@XmlTransient
	private List<RelationshipTemplate> relationshipTemplates = new ArrayList<RelationshipTemplate>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public String getRepositoryId() {
		return repositoryId;
	}

	public void setRepositoryId(String repositoryId) {
		this.repositoryId = repositoryId;
	}

	public Repository getRepository() {
		return repository;
	}

	public void setRepository(Repository repository) {
		this.repository = repository;
	}

}
