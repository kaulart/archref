package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.Level;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - LevelInterface is the Interface for the LevelService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelInterface {

	Collection<Level> findAllLevels();

	Level findById(long id);

	Level create(Level level);

	Level update(Level level);

	void delete(long id);

	void deleteAllLevels();

}
