package de.arthurkaul.archref.services;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.Level;

public interface LevelInterface {
	
    Collection<Level> findAllLevels();
    
    Level findById(long id);

    Level create(Level level);

    Level update(Level level);

    void delete(long id);
    
    void deleteAllLevels();

}
