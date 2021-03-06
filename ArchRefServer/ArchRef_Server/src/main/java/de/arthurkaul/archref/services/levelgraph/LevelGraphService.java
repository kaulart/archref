package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.repositories.levelgraph.LevelGraphRepository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Service - LevelGraphService is the Service for the LevelGraph Data it implements CRUD methods which create, update, retrieve and delete data from and in the database
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
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
			LevelGraph persistedLevelGraph = levelGraphRepository.findOne(levelGraph.getId());
			if (persistedLevelGraph == null) {
				return levelGraphRepository.save(levelGraph);
			}
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
