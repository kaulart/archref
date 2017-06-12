package de.arthurkaul.archref.model.types;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.model.topology.NodeTemplate;

@Entity
@Table(name="NODETYPE")
public class NodeType extends de.arthurkaul.archref.model.Entity{
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY")
	@JsonBackReference(value="repository-nodeType")
	private Repository repository;
	
	@Column(name="REPOSITORY_ID")
	private Long repositoryId;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="levelGraphNode")
	@JsonManagedReference (value = "nodeType-nodeTemplate")
	private Collection<NodeTemplate> nodeTemplates;
	

	public Repository getRepository() {
		return repository;
	}

	public void setRepository(Repository repository) {
		this.repository = repository;
	}
	
	public Long getRepositoryId() {
		return repositoryId;
	}

	public void setRepositoryId(Long repositoryId) {
		this.repositoryId = repositoryId;
	}

}
