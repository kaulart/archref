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
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.services.levelgraph.LevelGraphNodeService;

@RestController
public class LevelGraphNodeController {

	@Autowired
	LevelGraphNodeService levelGraphNodeService;

	@RequestMapping(value = "/api/levelgraphnodes", method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraphNode>> getAllLevelGraphNodes() {

		Collection<LevelGraphNode> levelGraphNodes = levelGraphNodeService.findAllLevelGraphNodes();

		if (levelGraphNodes.isEmpty()) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(levelGraphNodes);
	}

	@RequestMapping(value = "/api/levelgraphnodes/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraphNode> getLevelGraphNode(@PathVariable("id") long id) {

		LevelGraphNode levelGraphNode = levelGraphNodeService.findById(id);

		if (levelGraphNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraphNode);
	}

	@RequestMapping(value = "/api/levelgraphnodes", method = RequestMethod.POST)
	public ResponseEntity<LevelGraphNode> createLevelGraphNode(@RequestBody LevelGraphNode levelGraphNode,
			UriComponentsBuilder ucBuilder) {
	
		if (levelGraphNode.getId() != null) {
			throw new LevelGraphAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id "
							+ levelGraphNode.getId() + " already exist.");
		}
		LevelGraphNode saved = levelGraphNodeService.create(levelGraphNode);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraph/levelgraphnode/{id}").buildAndExpand(levelGraphNode.getId()).toUri())
				.body(saved);

	}

	@RequestMapping(value = "/api/levelgraphnodes/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraphNode> updateLevelGraphNode(@PathVariable("id") long id,
			@RequestBody LevelGraphNode levelGraphNode) {

		LevelGraphNode currentLevelGraphNode = levelGraphNodeService.findById(id);

		if (currentLevelGraphNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}


		levelGraphNodeService.update(currentLevelGraphNode);
		return ResponseEntity.ok().body(currentLevelGraphNode);
	}

	@RequestMapping(value = "/api/levelgraphnodes/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraphNode(@PathVariable("id") Long id) {

		LevelGraphNode levelGraphNode = levelGraphNodeService.findById(id);

		if (levelGraphNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		levelGraphNodeService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/levelgraphnodes", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphNodes() {

		levelGraphNodeService.deleteAllLevelGraphNodes();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(LevelGraphNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
