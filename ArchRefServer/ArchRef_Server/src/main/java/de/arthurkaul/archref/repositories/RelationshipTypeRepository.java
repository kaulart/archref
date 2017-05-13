package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.arthurkaul.archref.model.relation.RelationshipType;

@Repository
public interface RelationshipTypeRepository extends JpaRepository<RelationshipType, Long> {

}
