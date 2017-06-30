package de.arthurkaul.archref.repositories.levelgraph;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <LevelGraphNodeRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelGraphNodeRepository extends JpaRepository<LevelGraphNode, Long> {

}
