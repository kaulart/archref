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

/***********************************************************************************************************************************************************************************************************
 * 
 * @class LevelGraphController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the LevelGraph data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/levelgraphs")
public class LevelGraphController {

	@Autowired
	LevelGraphService levelGraphService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllLevelGraphs - Call the LevelGraph Service and retrieve all available LevelGraphs and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<Repository>> - Response with a collection of all available LevelGraphs in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraph>> getAllLevelGraphs() {
		Collection<LevelGraph> levelGraphs = levelGraphService.findAllLevelGraphs();

		if (levelGraphs.isEmpty()) {

			throw new EntityNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(levelGraphs);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getLevelGraph - Call the LevelGraph Service and look for a LevelGraph with a certain id. If a LevelGraph with this id exist in the database then retrieve it and send it back to the
	 *         client in a response
	 * 
	 * @return ResponseEntity<LevelGraph> - Response with only one LevelGraph in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraph> getLevelGraph(@PathVariable("id") long id) {

		LevelGraph levelGraph = levelGraphService.findById(id);

		if (levelGraph == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraph);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createLevelGraph - Create a new LevelGraph in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<LevelGraph> - Return the created LevelGraph with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<LevelGraph> createLevelGraph(@RequestBody LevelGraph levelGraph, UriComponentsBuilder ucBuilder) {

		if (levelGraph.getId() != null) {
			throw new EntityAlreadyExistException("LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + levelGraph.getId() + " already exist.");
		}
		LevelGraph saved = levelGraphService.create(levelGraph);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraph/{id}").buildAndExpand(levelGraph.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateLevelGraph - Update a LevelGraph if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraph> - Return the updated LevelGraph
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraph> updateLevelGraph(@PathVariable("id") long id, @RequestBody LevelGraph levelGraph) {

		LevelGraph currentLevelGraph = levelGraphService.findById(id);

		if (currentLevelGraph == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id + " not found.");
		}

		currentLevelGraph = levelGraph;

		levelGraphService.update(currentLevelGraph);
		return ResponseEntity.ok().body(currentLevelGraph);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteLevelGraph - Delete a LevelGraph if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraph> - return no LevelGraph
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraph(@PathVariable("id") Long id) {

		LevelGraph levelGraph = levelGraphService.findById(id);

		if (levelGraph == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id + " not found.");
		}

		levelGraphService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllLevelGraphs - Delete all available LevelGraphs in the database
	 * 
	 * @return ResponseEntity<Void> - return no LevelGraph
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphs() {

		levelGraphService.deleteAllNodeTypes();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the Repository RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
