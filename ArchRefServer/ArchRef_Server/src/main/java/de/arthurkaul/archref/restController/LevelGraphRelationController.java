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
import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;
import de.arthurkaul.archref.services.levelgraph.LevelGraphRelationService;


@RestController
public class LevelGraphRelationController {
	
	@Autowired
	LevelGraphRelationService levelGraphRelationService;

	@RequestMapping(value = "/api/levelgraphrelations", method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraphRelation>> getAllLevelGraphRelations() {

		Collection<LevelGraphRelation> levelGraphRelations = levelGraphRelationService.findAllLevelGraphRelations();

		if (levelGraphRelations.isEmpty()) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(levelGraphRelations);
	}

	@RequestMapping(value = "/api/levelgraphrelations/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraphRelation> getLevelGraphRelation(@PathVariable("id") long id) {

		LevelGraphRelation levelGraphRelation = levelGraphRelationService.findById(id);

		if (levelGraphRelation == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraphRelation);
	}

	@RequestMapping(value = "/api/levelgraphrelations", method = RequestMethod.POST)
	public ResponseEntity<LevelGraphRelation> createLevelGraphRelation(@RequestBody LevelGraphRelation levelGraphRelation,
			UriComponentsBuilder ucBuilder) {
	
		if (levelGraphRelation.getId() != null) {
			throw new LevelGraphAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id "
							+ levelGraphRelation.getId() + " already exist.");
		}
		LevelGraphRelation saved = levelGraphRelationService.create(levelGraphRelation);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraphrelation/{id}").buildAndExpand(levelGraphRelation.getId()).toUri())
				.body(saved);

	}

	@RequestMapping(value = "/api/levelgraphrelations/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraphRelation> updateLevelGraphRelation(@PathVariable("id") long id,
			@RequestBody LevelGraphRelation levelGraphRelation) {

		LevelGraphRelation currentLevelGraphRelation = levelGraphRelationService.findById(id);

		if (currentLevelGraphRelation == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}


		levelGraphRelationService.update(currentLevelGraphRelation);
		return ResponseEntity.ok().body(currentLevelGraphRelation);
	}

	@RequestMapping(value = "/api/levelgraphrelations/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraphRelation(@PathVariable("id") Long id) {

		LevelGraphRelation levelGraphRelation = levelGraphRelationService.findById(id);

		if (levelGraphRelation == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		levelGraphRelationService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/levelgraphrelations", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphRelations() {

		levelGraphRelationService.deleteAllLevelGraphRelations();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(LevelGraphNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
