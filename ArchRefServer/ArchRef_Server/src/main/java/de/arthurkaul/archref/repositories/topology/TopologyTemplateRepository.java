package de.arthurkaul.archref.repositories.topology;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.topology.TopologyTemplate;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <TopologyTemplateRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA
 *        Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface TopologyTemplateRepository extends JpaRepository<TopologyTemplate, Long> {

}
