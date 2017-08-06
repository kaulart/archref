package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - LevelGraphNodeInterface is the Interface for the LevelGraphNodeService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface LevelGraphNodeInterface {

	Collection<LevelGraphNode> findAllLevelGraphNodes();

	LevelGraphNode findById(long id);

	LevelGraphNode create(LevelGraphNode levelGraphNode);

	LevelGraphNode update(LevelGraphNode levelGraphNode);

	void delete(long id);

	void deleteAllLevelGraphNodes();

}
