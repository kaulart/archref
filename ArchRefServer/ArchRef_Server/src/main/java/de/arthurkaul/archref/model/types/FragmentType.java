package de.arthurkaul.archref.model.types;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="FRAGMENTTYPE")
public class FragmentType{
	
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
