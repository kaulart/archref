package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import de.arthurkaul.archref.model.levelgraph.Level;
import de.arthurkaul.archref.repositories.levelgraph.LevelRepository;

@Service
public class LevelService implements LevelInterface{

	@Autowired
	LevelRepository levelRepository;
	
	@Override
	public Collection<Level> findAllLevels() {
		return levelRepository.findAll();
	}

	@Override
	public Level findById(long id) {
		return levelRepository.findOne(id);
	}

	@Override
	public Level create(Level level) {
		if (level.getId() != null) {
			return null;
        }
		return levelRepository.save(level);
	}

	@Override
	public Level update(Level level) {
	   Level persistedLevel = levelRepository.findOne(level.getId());
        
		if (persistedLevel == null) {
            return null;
        }
		return levelRepository.save(level);
	}

	@Override
	public void delete(long id) {
		levelRepository.delete(id);
		
	}

	@Override
	public void deleteAllLevels() {
		levelRepository.deleteAll();
	}


}
