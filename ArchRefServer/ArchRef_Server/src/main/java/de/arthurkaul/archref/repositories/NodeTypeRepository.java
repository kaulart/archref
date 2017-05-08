package de.arthurkaul.archref.repositories;

import org.springframework.stereotype.Repository;

import de.arthurkaul.archref.model.NodeType;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface NodeTypeRepository  extends JpaRepository<NodeType, Long> {

	
}