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
import de.arthurkaul.archref.model.topology.NodeTemplate;

/*******************************************************************************************************************************************************************************************************
 *
 * @class - <NodeType> - NodeType inherited from <Entity> it is the type of a
 *        <NodeTemplate> or of a <LevelGraphNode>
 *
 * @field - <Repository> repository: Repository - Repository of the NodeType
 * @field - Long repositoryId - ID of the Repository of the NodeType
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
@Entity
@Table(name = "NODETYPE")
@XmlRootElement(name = "NodeType")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tNodeType")
public class NodeType extends de.arthurkaul.archref.model.Entity {

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "REPOSITORY", updatable = false)
	@JsonBackReference(value = "repository-nodeType")
	@XmlInverseReference(mappedBy = "nodeTypes")
	private Repository repository;

	@Column(name = "REPOSITORY_ID")
	@XmlAttribute(name = "repositoryRef")
	private Long repositoryId;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "nodeType")
	@JsonManagedReference(value = "nodeType-nodeTemplate")
	@JsonIgnore
	@XmlTransient
	private List<NodeTemplate> nodeTemplates = new ArrayList<NodeTemplate>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/

	public Long getRepositoryId() {
		return repositoryId;
	}

	public void setRepositoryId(Long repositoryId) {
		this.repositoryId = repositoryId;
	}

	public Repository getRepository() {
		return repository;
	}

	public void setRepository(Repository repository) {
		this.repository = repository;
	}

}
