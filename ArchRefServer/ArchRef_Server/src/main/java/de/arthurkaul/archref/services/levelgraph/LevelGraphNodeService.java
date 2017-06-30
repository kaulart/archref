package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.repositories.levelgraph.LevelGraphNodeRepository;

@Service
public class LevelGraphNodeService implements LevelGraphNodeInterface {

	@Autowired
	LevelGraphNodeRepository levelGraphNodeRepository;

	@Override
	public Collection<LevelGraphNode> findAllLevelGraphNodes() {
		return levelGraphNodeRepository.findAll();
	}

	@Override
	public LevelGraphNode findById(long id) {

		return levelGraphNodeRepository.findOne(id);
	}

	@Override
	public LevelGraphNode create(LevelGraphNode levelGraphNode) {

		if (levelGraphNode.getId() != null) {
			return null;
		}

		return levelGraphNodeRepository.save(levelGraphNode);
	}

	@Override
	public LevelGraphNode update(LevelGraphNode levelGraphNode) {
		LevelGraphNode persistedLevelGraphNode = levelGraphNodeRepository.findOne(levelGraphNode.getId());

		if (persistedLevelGraphNode == null) {
			return null;
		}

		return levelGraphNodeRepository.save(persistedLevelGraphNode);
	}

	@Override
	public void delete(long id) {
		levelGraphNodeRepository.delete(id);

	}

	@Override
	public void deleteAllLevelGraphNodes() {
		levelGraphNodeRepository.deleteAll();

	}

}
