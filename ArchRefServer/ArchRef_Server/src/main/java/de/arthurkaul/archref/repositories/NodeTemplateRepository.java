package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import de.arthurkaul.archref.model.topologyTemplate.NodeTemplate;


public interface NodeTemplateRepository extends JpaRepository<NodeTemplate, Long>{

}
