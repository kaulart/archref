package de.arthurkaul.archref.model.types;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;
import de.arthurkaul.archref.model.Repository;

@Entity
@Table(name="NODETYPE")
public class NodeType extends de.arthurkaul.archref.model.Entity{
	
	@Column(name="ICON_PATH")
	@NotNull
	private String icon;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="REPOSITORY")
	@JsonBackReference(value="repository-nodeType")
	private Repository repository;
	
	@Column(name="REPOSITORY_ID")
	private Long repositoryId;

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

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
