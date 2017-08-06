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
import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;
import de.arthurkaul.archref.services.levelgraph.LevelGraphNodeService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class LevelGraphNodeController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the LevelGraphNode data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/levelgraphnodes")
public class LevelGraphNodeController {

	@Autowired
	LevelGraphNodeService levelGraphNodeService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllLevelGraphNodes - Call the LevelGraphNode Service and retrieve all available LevelGraphNodes and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<LevelGraphNode>> - Response with a collection of all available LevelGraphNodes in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraphNode>> getAllLevelGraphNodes() {

		Collection<LevelGraphNode> levelGraphNodes = levelGraphNodeService.findAllLevelGraphNodes();

		if (levelGraphNodes.isEmpty()) {
			throw new EntityNotFoundException("LevelGraphNodeNotFoundException: No LevelGraphNode found. No LevelGraphNode exist.");

		}
		return ResponseEntity.ok().body(levelGraphNodes);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getLevelGraphNode - Call the LevelGraphNode Service and look for a LevelGraphNode with a certain id. If a LevelGraphNode with this id exist in the database then retrieve it and send
	 *         it back to the client in a response
	 * 
	 * @return ResponseEntity<LevelGraphNode> - Response with only one LevelGraphNode in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraphNode> getLevelGraphNode(@PathVariable("id") long id) {

		LevelGraphNode levelGraphNode = levelGraphNodeService.findById(id);

		if (levelGraphNode == null) {
			throw new EntityNotFoundException("LevelGraphNodeNotFoundException: Unable to find LevelGraphNode. LevelGraphNode with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(levelGraphNode);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createLevelGraphNode - Create a new LevelGraphNode in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<LevelGraphNode> - Return the created LevelGraphNode with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<LevelGraphNode> createLevelGraphNode(@RequestBody LevelGraphNode levelGraphNode, UriComponentsBuilder ucBuilder) {

		if (levelGraphNode.getId() != null) {
			throw new EntityAlreadyExistException("LevelGraphNodeNodeAlreadyExistException: Unable to create LevelGraphNode. LevelGraphNode with id " + levelGraphNode.getId() + " already exist.");
		}
		LevelGraphNode saved = levelGraphNodeService.create(levelGraphNode);

		return ResponseEntity.created(ucBuilder.path("/api/levelgraphnodes/{id}").buildAndExpand(levelGraphNode.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateLevelGraphNode - Update a LevelGraphNode if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraphNode> - Return the updated LevelGraphNode
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<LevelGraphNode> updateLevelGraphNode(@PathVariable("id") long id, @RequestBody LevelGraphNode levelGraphNode) {

		LevelGraphNode currentLevelGraphNode = levelGraphNodeService.findById(id);

		if (currentLevelGraphNode == null) {
			throw new EntityNotFoundException("LevelGraphNodeNotFoundException: Unable to update LevelGraphNode. LevelGraphNode with id " + id + " not found.");
		}

		currentLevelGraphNode = levelGraphNode;
		levelGraphNodeService.update(currentLevelGraphNode);
		return ResponseEntity.ok().body(currentLevelGraphNode);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteLevelGraphNode - Delete a LevelGraphNode if it exist in the database
	 * 
	 * @return ResponseEntity<LevelGraphNode> - return no LevelGraphNode
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevelGraphNode(@PathVariable("id") Long id) {

		LevelGraphNode levelGraphNode = levelGraphNodeService.findById(id);

		if (levelGraphNode == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id + " not found.");
		}

		levelGraphNodeService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllLevelGraphNodes - Delete all available LevelGraphNodes in the database
	 * 
	 * @return ResponseEntity<Void> - return no LevelGraphNode
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevelGraphNodes() {

		levelGraphNodeService.deleteAllLevelGraphNodes();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the LevelGraphNode RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
