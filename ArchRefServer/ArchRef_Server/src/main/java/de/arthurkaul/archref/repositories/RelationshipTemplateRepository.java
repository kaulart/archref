package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.topologyTemplate.NodeTemplate;
import de.arthurkaul.archref.model.topologyTemplate.RelationshipTemplate;

public interface RelationshipTemplateRepository extends JpaRepository<RelationshipTemplate, Long>{

}
