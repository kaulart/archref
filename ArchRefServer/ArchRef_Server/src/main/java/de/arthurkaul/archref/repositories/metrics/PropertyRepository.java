package de.arthurkaul.archref.repositories.metrics;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.metrics.Property;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <LevelGraphNodeRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface PropertyRepository extends JpaRepository<Property, Long> {

}
