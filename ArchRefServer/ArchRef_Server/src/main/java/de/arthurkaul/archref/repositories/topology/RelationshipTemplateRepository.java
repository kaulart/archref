package de.arthurkaul.archref.repositories.topology;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;

public interface RelationshipTemplateRepository extends JpaRepository<RelationshipTemplate, Long>{

}
