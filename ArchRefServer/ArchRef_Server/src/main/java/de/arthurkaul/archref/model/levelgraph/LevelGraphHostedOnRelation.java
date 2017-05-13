package de.arthurkaul.archref.model.levelgraph;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class LevelGraphHostedOnRelation {
	@Id
	@GeneratedValue()
	@Column(name="ID")
	private Long id;

}
