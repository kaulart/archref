package de.arthurkaul.archref.restController;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import de.arthurkaul.archref.exceptions.LevelGraphAlreadyExistException;
import de.arthurkaul.archref.exceptions.LevelGraphNotFoundException;
import de.arthurkaul.archref.model.levelgraph.Level;
import de.arthurkaul.archref.services.levelgraph.LevelService;

@RestController
public class LevelController {

	@Autowired
	LevelService levelService;

	@RequestMapping(value = "/api/levels", method = RequestMethod.GET)
	public ResponseEntity<Collection<Level>> getAllLevels() {

		Collection<Level> levels = levelService.findAllLevels();

		if (levels.isEmpty()) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(levels);
	}

	@RequestMapping(value = "/api/levels/{id}", method = RequestMethod.GET)
	public ResponseEntity<Level> getLevel(@PathVariable("id") long id) {

		Level level = levelService.findById(id);

		if (level == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(level);
	}

	@RequestMapping(value = "/api/levels", method = RequestMethod.POST)
	public ResponseEntity<Level> createLevel(@RequestBody Level level, UriComponentsBuilder ucBuilder) {

		if (level.getId() != null) {
			throw new LevelGraphAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + level.getId()
							+ " already exist.");
		}
		Level saved = levelService.create(level);

		return ResponseEntity.created(ucBuilder.path("/api/level/{id}").buildAndExpand(level.getId()).toUri())
				.body(saved);

	}

	@RequestMapping(value = "/api/levels/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Level> updateLevel(@PathVariable("id") long id, @RequestBody Level level) {

		Level currentLevel = levelService.findById(id);

		if (currentLevel == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		currentLevel = level;

		levelService.update(currentLevel);
		return ResponseEntity.ok().body(currentLevel);
	}

	@RequestMapping(value = "/api/levels/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevel(@PathVariable("id") Long id) {

		Level level = levelService.findById(id);

		if (level == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		levelService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/levels", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevels() {

		levelService.deleteAllLevels();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(LevelGraphNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
