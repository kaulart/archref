package de.arthurkaul.archref.repositories.levelgraph;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <LevelGraphRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelGraphRepository extends JpaRepository<LevelGraph, Long> {

}
