package de.arthurkaul.archref.services;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;

public interface LevelGraphInterface {

    Collection<LevelGraph> findAllLevelGraphs();
    
    LevelGraph findById(long id);

    LevelGraph create(LevelGraph levelGraphs);

    LevelGraph update(LevelGraph levelGraphs);

    void delete(long id);
    
    void deleteAllNodeTypes();
	
}
