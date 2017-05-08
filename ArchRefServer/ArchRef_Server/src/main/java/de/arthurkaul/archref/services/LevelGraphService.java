package de.arthurkaul.archref.services;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.LevelGraph;
import de.arthurkaul.archref.repositories.LevelGraphRepository;

@Service
public class LevelGraphService implements LevelGraphInterface {

	@Autowired
	LevelGraphRepository levelGraphRepository;
	
	@Override
	public Collection<LevelGraph> findAllLevelGraphs() {
	
		return levelGraphRepository.findAll();
	}

	@Override
	public LevelGraph findById(long id) {
		
		return levelGraphRepository.findOne(id);
	}

	@Override
	public LevelGraph create(LevelGraph levelGraph) {
		if (levelGraph.getId() != null) {
			return null;
        }
		return levelGraphRepository.save(levelGraph);
	}

	@Override
	public LevelGraph update(LevelGraph levelGraph) {
		LevelGraph persistedLevelGraph = levelGraphRepository.findOne(levelGraph.getId());
        
		if (persistedLevelGraph == null) {
            return null;
        }
		return levelGraphRepository.save(levelGraph);
	}

	@Override
	public void delete(long id) {
		levelGraphRepository.delete(id);
	}

	@Override
	public void deleteAllNodeTypes() {
		levelGraphRepository.deleteAll();
	}

}
