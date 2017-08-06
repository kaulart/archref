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
import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;
import de.arthurkaul.archref.services.levelgraph.LevelGraphRelationService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class LevelGraphRelationController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the LevelGraphRelation data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/levelgraphrelations")
public class LevelGraphRelationController {

	@Autowired
	LevelGraphRelationService levelGraphRelationService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllLevelGraphRelations - Call the LevelGraphRelation Service and retrieve all available LevelGraphRelations and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<LevelGraphRelation>> - Response with a collection of all available LevelGraphRelations in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraphRelation>> getAllLevelGraphRelations() {

		Collection<LevelGraphRelation> levelGraphRelations = levelGraphRelationService.findAllLevelGraphRelations();

		if (levelGraphRelations.isEmpty()) {
			throw new EntityNotFoundException("LevelGraphRelationNotFoundException: No LevelGraphRelation found. No LevelGraphRelation exist.");

		}
		return ResponseEntity.ok().body(levelGraphRelations);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getLevelGraphRelation - Call the LevelGraphRelation Service and look for a LevelGraphRelation with a certain id. If a LevelGraphRelation with this id exist in the database then
	 *         retrieve it and send it back to the client in a response
	 * 
	 * @return ResponseEntity<LevelGraphRelation> - Response with only one LevelGraphRelation in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraphRelation> getLevelGraphRelation(@PathVariable("id") long id) {

		LevelGraphRelation levelGraphRelation = levelGraphRelationService.findById(id);

		if (levelGraphRelation == null) {
			throw new EntityNotFoundException("LevelGraphRelationNotFoundException: Unable to find LevelGraphRelation. LevelGraphRelation with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraphRelation);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createLevelGraphRelation - Create a new LevelGraphRelation in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<LevelGraphRelation> - Return the created LevelGraphRelation with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<LevelGraphRelation> createLevelGraphRelation(@RequestBody LevelGraphRelation levelGraphRelation, UriComponentsBuilder ucBuilder) {

		if (levelGraphRelation.getId() != null) {
			throw new EntityAlreadyExistException(
					"LevelGraphRelationAlreadyExistException: Unable to create LevelGraphRelation. LevelGraphRelation with id " + levelGraphRelation.getId() + " already exist.");
		}
		LevelGraphRelation saved = levelGraphRelationService.create(levelGraphRelation);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraphrelation/{id}").buildAndExpand(levelGraphRelation.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateLevelGraphRelation - Update a LevelGraphRelation if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraphRelation> - Return the updated LevelGraphRelation
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraphRelation> updateLevelGraphRelation(@PathVariable("id") long id, @RequestBody LevelGraphRelation levelGraphRelation) {

		LevelGraphRelation currentLevelGraphRelation = levelGraphRelationService.findById(id);

		if (currentLevelGraphRelation == null) {
			throw new EntityNotFoundException("LevelGraphRelationNotFoundException: Unable to update LevelGraphRelation. LevelGraphRelation with id " + id + " not found.");
		}

		currentLevelGraphRelation = levelGraphRelation;
		levelGraphRelationService.update(currentLevelGraphRelation);
		return ResponseEntity.ok().body(currentLevelGraphRelation);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteLevelGraphRelation - Delete a LevelGraphRelation if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraphRelation> - return no LevelGraphRelation
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraphRelation(@PathVariable("id") Long id) {

		LevelGraphRelation levelGraphRelation = levelGraphRelationService.findById(id);

		if (levelGraphRelation == null) {
			throw new EntityNotFoundException("LevelGraphRelationNotFoundException: Unable to delete LevelGraphRelation. LevelGraphRelation with id " + id + " not found.");
		}

		levelGraphRelationService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllLevelGraphRelations - Delete all available LevelGraphRelations in the database
	 * 
	 * @return ResponseEntity<Void> - return no LevelGraphRelation
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphRelations() {

		levelGraphRelationService.deleteAllLevelGraphRelations();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the LevelGraphRelation RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler(EntityNotFoundException.class)
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
