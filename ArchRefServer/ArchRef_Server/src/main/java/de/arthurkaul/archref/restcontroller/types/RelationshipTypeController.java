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
import de.arthurkaul.archref.model.types.RelationshipType;
import de.arthurkaul.archref.services.types.RelationshipTypeService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class RelationshipTypeController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the RelationshipType data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/relationshiptypes")
public class RelationshipTypeController {

	@Autowired
	RelationshipTypeService relationshipTypeService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllRelationshipTypes - Call the RelationshipType Service and retrieve all available RelationshipTypes and send response back to the client
	 * 
	 * @return ResponseEntity<Collection<RelationshipType>> - Response with a collection of all available RelationshipTypes in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<RelationshipType>> getAllRelationshipTypes() {

		Collection<RelationshipType> relationshipTypes = relationshipTypeService.findAllRelationshipTypes();

		if (relationshipTypes.isEmpty()) {

			throw new EntityNotFoundException("RelationshipTypeNotFoundException: No RelationshipType found. No RelationshipType exist.");

		}
		return ResponseEntity.ok().body(relationshipTypes);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getRelationshipType - Call the RelationshipType Service and look for a RelationshipType with a certain id. If a RelationshipType with this id exist in the database then retrieve it
	 *         and send it back to the client in a response
	 * 
	 * @return ResponseEntity<RelationshipType> - Response with only one RelationshipType in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RelationshipType> getRelationshipType(@PathVariable("id") long id) {

		RelationshipType relationshipType = relationshipTypeService.findById(id);

		if (relationshipType == null) {
			throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to find RelationshipType. RelationshipType with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(relationshipType);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createRelationshipType - Create a new RelationshipType in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<RelationshipType> - Return the created RelationshipType with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<RelationshipType> createRelationshipType(@RequestBody RelationshipType relationshipType, UriComponentsBuilder ucBuilder) {

		if (relationshipType.getId() != null) {
			throw new EntityAlreadyExistException("RelationshipTypeAlreadyExistException: Unable to create NodeType. RelationshipType with id " + relationshipType.getId() + " already exist.");
		}

		RelationshipType saved = relationshipTypeService.create(relationshipType);

		return ResponseEntity.created(ucBuilder.path("/api/relationshiptype/{id}").buildAndExpand(relationshipType.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateRelationshipType - Update a RelationshipType if it exist in the database
	 * 
	 * @return ResponseEntity<RelationshipType> - Return the updated RelationshipType
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<RelationshipType> updateRelationshipType(@PathVariable("id") long id, @RequestBody RelationshipType relationshipType) {

		RelationshipType currentRelationshipType = relationshipTypeService.findById(id);

		if (currentRelationshipType == null) {
			throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to update RelationshipType. RelationshipType with id " + id + " not found.");
		}
		currentRelationshipType = relationshipType;

		relationshipTypeService.update(currentRelationshipType);
		return ResponseEntity.ok().body(currentRelationshipType);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteRelationshipType - Delete a RelationshipType if it exist in the database
	 * 
	 * @return ResponseEntity<Void> - return no RelationshipType
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteRelationshipType(@PathVariable("id") Long id) {

		RelationshipType relationshipTypes = relationshipTypeService.findById(id);

		if (relationshipTypes == null) {
			throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to delete RelationshipType. RelationshipType with id " + id + " not found.");
		}

		relationshipTypeService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllRelationshipTypes - Delete all available RelationshipTypes in the database
	 * 
	 * @return ResponseEntity<Void> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllRelationshipTypes() {

		relationshipTypeService.deleteAllRelationshipTypes();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the RelationshipType RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
