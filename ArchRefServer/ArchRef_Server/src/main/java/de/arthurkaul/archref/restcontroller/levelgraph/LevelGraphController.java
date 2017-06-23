package de.arthurkaul.archref.restcontroller.levelgraph;

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

import de.arthurkaul.archref.exceptions.EntityAlreadyExistException;
import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.services.levelgraph.LevelGraphService;

@RestController
public class LevelGraphController {

	@Autowired
	LevelGraphService levelGraphService;
	

	@RequestMapping(value = "/api/levelgraphs", method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraph>> getAllLevelGraphs() {
		Collection<LevelGraph> levelGraphs = levelGraphService.findAllLevelGraphs();

		if (levelGraphs.isEmpty()) {

			throw new EntityNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(levelGraphs);
	}

	@RequestMapping(value = "/api/levelgraphs/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraph> getLevelGraph(@PathVariable("id") long id) {

		LevelGraph levelGraph = levelGraphService.findById(id);

		if (levelGraph == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraph);
	}

	@RequestMapping(value = "/api/levelgraphs", method = RequestMethod.POST)
	public ResponseEntity<LevelGraph> createLevelGraph(@RequestBody LevelGraph levelGraph,
			UriComponentsBuilder ucBuilder) {

		if (levelGraph.getId() != null) {
			throw new EntityAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id "
							+ levelGraph.getId() + " already exist.");
		}
		LevelGraph saved = levelGraphService.create(levelGraph);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraph/{id}").buildAndExpand(levelGraph.getId()).toUri())
				.body(saved);

	}

	@RequestMapping(value = "/api/levelgraphs/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraph> updateLevelGraph(@PathVariable("id") long id,
			@RequestBody LevelGraph levelGraph) {

		LevelGraph currentLevelGraph = levelGraphService.findById(id);

		if (currentLevelGraph == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		currentLevelGraph = levelGraph;

		levelGraphService.update(currentLevelGraph);
		return ResponseEntity.ok().body(currentLevelGraph);
	}

	@RequestMapping(value = "/api/levelgraphs/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraph(@PathVariable("id") Long id) {

		LevelGraph levelGraph = levelGraphService.findById(id);

		if (levelGraph == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		levelGraphService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/levelgraphs", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphs() {

		levelGraphService.deleteAllNodeTypes();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
