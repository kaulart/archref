package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;
import de.arthurkaul.archref.repositories.levelgraph.LevelGraphRelationRepository;

@Service
public class LevelGraphRelationService implements LevelGraphRelationInterface{
		
	@Autowired
	LevelGraphRelationRepository levelGraphRelationRepository;
	
	@Override
	public Collection<LevelGraphRelation> findAllLevelGraphRelations() {
		return levelGraphRelationRepository.findAll();
	}

	@Override
	public LevelGraphRelation findById(long id) {
		return levelGraphRelationRepository.findOne(id);
	}

	@Override
	public LevelGraphRelation create(LevelGraphRelation levelGraphRelation) {
		if (levelGraphRelation.getId() != null) {
			return null;
        }
		return levelGraphRelationRepository.save(levelGraphRelation);
	}

	@Override
	public LevelGraphRelation update(LevelGraphRelation levelGraphRelation) {
		LevelGraphRelation persistedLevelGraphRelation = levelGraphRelationRepository.findOne(levelGraphRelation.getId());

        if (persistedLevelGraphRelation == null) {
            return null;
        }
		
		return levelGraphRelationRepository.save(levelGraphRelation);
	}

	@Override
	public void delete(long id) {
		levelGraphRelationRepository.delete(id);		
	}

	@Override
	public void deleteAllLevelGraphRelations() {
		levelGraphRelationRepository.deleteAll();		
	}

}
