package de.arthurkaul.archref.restcontroller.topology;

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
import de.arthurkaul.archref.model.topology.RelationshipTemplate;
import de.arthurkaul.archref.services.topology.RelationshipTemplateService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class RelationshipTemplateController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the RelationshipTemplate data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/relationshiptemplates")

public class RelationshipTemplateController {

	@Autowired
	RelationshipTemplateService relationshipTemplateService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllRelationshipTemplates - Call the RelationshipTemplate Service and retrieve all available RelationshipTemplates and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<RelationshipTemplate>> - Response with a collection of all available RelationshipTemplates in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<RelationshipTemplate>> getAllRelationshipTemplates() {

		Collection<RelationshipTemplate> relationshiptemplates = relationshipTemplateService.findAllRelationshipTemplates();

		if (relationshiptemplates.isEmpty()) {
			throw new EntityNotFoundException("RelationshipTemplateNotFoundException: No RelationshipTemplate found. No RelationshipTemplate exist.");
		}
		return ResponseEntity.ok().body(relationshiptemplates);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getRelationshipTemplate - Call the RelationshipTemplate Service and look for a RelationshipTemplate with a certain id. If a RelationshipTemplate with this id exist in the database
	 *         then retrieve it and send it back to the client in a response
	 * 
	 * @return ResponseEntity<RelationshipTemplate> - Response with only one RelationshipTemplate in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RelationshipTemplate> getRelationshipTemplate(@PathVariable("id") long id) {

		RelationshipTemplate relationshiptemplate = relationshipTemplateService.findById(id);

		if (relationshiptemplate == null) {
			throw new EntityNotFoundException("RelationshipTemplateNotFoundException: Unable to find RelationshipTemplate. RelationshipTemplate with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(relationshiptemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createRelationshipTemplate - Create a new RelationshipTemplate in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<RelationshipTemplate> - Return the created RelationshipTemplate with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<RelationshipTemplate> createRelationshipTemplate(@RequestBody RelationshipTemplate relationshiptemplate, UriComponentsBuilder ucBuilder) {

		if (relationshiptemplate.getId() != null) {
			throw new EntityAlreadyExistException(
					"RelationshipTemplateAlreadyExistException: Unable to create RelationshipTemplate. RelationshipTemplate with id " + relationshiptemplate.getId() + " already exist.");
		}

		RelationshipTemplate saved = relationshipTemplateService.create(relationshiptemplate);

		return ResponseEntity.created(ucBuilder.path("/api/relationshiptemplates/{id}").buildAndExpand(relationshiptemplate.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateRelationshipTemplate - Update a RelationshipTemplate if it exist in the database
	 * 
	 * @return ResponseEntity<RelationshipTemplate> - Return the updated RelationshipTemplate
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateRelationshipTemplate(@PathVariable("id") long id, @RequestBody RelationshipTemplate relationshiptemplate) {

		RelationshipTemplate currentrelationshiptemplate = relationshipTemplateService.findById(id);

		if (currentrelationshiptemplate == null) {
			throw new EntityNotFoundException("RelationshipTemplateNotFoundException: Unable to update. RelationshipTemplate with id " + id + " not found.");
		}

		currentrelationshiptemplate = relationshiptemplate;

		currentrelationshiptemplate = relationshipTemplateService.update(relationshiptemplate);
		return ResponseEntity.ok().body(currentrelationshiptemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteRelationshipTemplate - Delete a RelationshipTemplate if it exist in the database
	 * 
	 * @return ResponseEntity<RelationshipTemplate> - return no RelationshipTemplate
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteRelationshipTemplate(@PathVariable("id") Long id) {

		RelationshipTemplate relationshiptemplate = relationshipTemplateService.findById(id);

		if (relationshiptemplate == null) {
			throw new EntityNotFoundException("RelationshipTemplateException: Unable to delete RelationshipTemplate. RelationshipTemplate with id " + id + " not found.");
		}

		relationshipTemplateService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllRelationshipTemplates - Delete all available repositories in the database
	 * 
	 * @return ResponseEntity<Void> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllRelationshipTemplates() {

		relationshipTemplateService.deleteAllRelationshipTemplates();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the RelationshipTemplate RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler(EntityNotFoundException.class)
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
