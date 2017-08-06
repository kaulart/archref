package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - LevelGraphInterface is the Interface for the LevelGraphService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelGraphInterface {

	Collection<LevelGraph> findAllLevelGraphs();

	LevelGraph findById(long id);

	LevelGraph create(LevelGraph levelGraphs);

	LevelGraph update(LevelGraph levelGraphs);

	void delete(long id);

	void deleteAllNodeTypes();

}
