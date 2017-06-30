package de.arthurkaul.archref.repositories.types;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.arthurkaul.archref.model.types.RelationshipType;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <RelationshipTypeRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA
 *        Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Repository
public interface RelationshipTypeRepository extends JpaRepository<RelationshipType, Long> {

}
