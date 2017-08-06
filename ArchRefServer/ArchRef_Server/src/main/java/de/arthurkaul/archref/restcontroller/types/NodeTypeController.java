package de.arthurkaul.archref.restcontroller.types;

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
import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.services.types.NodeTypeService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class NodeTypeController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the NodeType data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/nodetypes")
public class NodeTypeController {

	@Autowired
	NodeTypeService nodeTypeService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllNodeTypes - Call the NodeType Service and retrieve all available NodeTypes and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<NodeType>> - Response with a collection of all available NodeTypes in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<NodeType>> getAllNodeTypes() {

		Collection<NodeType> nodeTypes = nodeTypeService.findAllNodeTypes();

		if (nodeTypes.isEmpty()) {

			throw new EntityNotFoundException("NodeTypeNotFoundException: No NodeType found. No NodeType exist.");

		}
		return ResponseEntity.ok().body(nodeTypes);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getNodeType - Call the NodeType Service and look for a NodeType with a certain id. If a NodeType with this id exist in the database then retrieve it and send it back to the client in
	 *         a response
	 * 
	 * @return ResponseEntity<NodeType> - Response with only one NodeType in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<NodeType> getNodeType(@PathVariable("id") long id) {

		NodeType nodeType = nodeTypeService.findById(id);

		if (nodeType == null) {
			throw new EntityNotFoundException("NodeTypeNotFoundException: Unable to find NodeType. NodeType with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(nodeType);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createNodeType - Create a new NodeType in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<NodeType> - Return the created NodeType with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<NodeType> createNodeType(@RequestBody NodeType nodeType, UriComponentsBuilder ucBuilder) {

		if (nodeType.getId() != null) {
			throw new EntityAlreadyExistException("NodeTypeAlreadyExistException: Unable to create NodeType. NodeType with id " + nodeType.getId() + " already exist.");
		}
		NodeType saved = nodeTypeService.create(nodeType);

		return ResponseEntity.created(ucBuilder.path("/api/nodetype/{id}").buildAndExpand(nodeType.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateNodeType - Update a NodeType if it exist in the database
	 * 
	 * @return ResponseEntity<NodeType> - Return the updated NodeType
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<NodeType> updateNodeType(@PathVariable("id") long id, @RequestBody NodeType nodeType) {

		NodeType currentNodeType = nodeTypeService.findById(id);

		if (currentNodeType == null) {
			throw new EntityNotFoundException("NodeTypeNotFoundException: Unable to update NodeType. NodeType with id " + id + " not found.");
		}
		currentNodeType = nodeType;

		nodeTypeService.update(currentNodeType);
		return ResponseEntity.ok().body(currentNodeType);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteNodeType - Delete a NodeType if it exist in the database
	 * 
	 * @return ResponseEntity<NodeType> - return no NodeType
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNodeType(@PathVariable("id") Long id) {

		NodeType nodeType = nodeTypeService.findById(id);

		if (nodeType == null) {
			throw new EntityNotFoundException("NodeTypeNotFoundException: Unable to delete NodeType. NodeType with id " + id + " not found.");
		}

		nodeTypeService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllNodeTypes - Delete all available NodeTypes in the database
	 * 
	 * @return ResponseEntity<Void> - return no NodeType
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllNodeTypes() {

		nodeTypeService.deleteAllNodeTypes();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the NodeType RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
