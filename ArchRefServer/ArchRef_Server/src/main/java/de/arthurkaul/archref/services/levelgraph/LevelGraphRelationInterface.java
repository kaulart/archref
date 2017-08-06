package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - LevelGraphRelationInterface is the Interface for the LevelGraphRelationService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelGraphRelationInterface {

	Collection<LevelGraphRelation> findAllLevelGraphRelations();

	LevelGraphRelation findById(long id);

	LevelGraphRelation create(LevelGraphRelation levelGraphRelation);

	LevelGraphRelation update(LevelGraphRelation levelGraphRelation);

	void delete(long id);

	void deleteAllLevelGraphRelations();

}
