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
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.services.topology.NodeTemplateService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class NodeTemplateController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the NodeTemplate data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/nodetemplates")
public class NodeTemplateController {

	@Autowired
	NodeTemplateService nodeTemplateService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllNodeTemplates - Call the NodeTemplate Service and retrieve all available NodeTemplates and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<NodeTemplate>> - Response with a collection of all available NodeTemplates in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<NodeTemplate>> getAllNodeTemplates() {

		Collection<NodeTemplate> nodeTemplates = nodeTemplateService.findAllNodeTemplates();

		if (nodeTemplates.isEmpty()) {
			throw new EntityNotFoundException("NodeTemplateNotFoundException: No NodeTemplate found. No NodeTemplate exist.");
		}
		return ResponseEntity.ok().body(nodeTemplates);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getNodeTemplate - Call the NodeTemplate Service and look for a NodeTemplate with a certain id. If a NodeTemplate with this id exist in the database then retrieve it and send it back
	 *         to the client in a response
	 * 
	 * @return ResponseEntity<NodeTemplate> - Response with only one NodeTemplate in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<NodeTemplate> getNodeTemplate(@PathVariable("id") long id) {

		NodeTemplate nodeTemplate = nodeTemplateService.findById(id);

		if (nodeTemplate == null) {
			throw new EntityNotFoundException("NodeTemplateNotFoundException: Unable to find NodeTemplate. NodeTemplate with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(nodeTemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createNodeTemplate - Create a new NodeTemplate in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<NodeTemplate> - Return the created NodeTemplate with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<NodeTemplate> createNodeTemplate(@RequestBody NodeTemplate nodeTemplate, UriComponentsBuilder ucBuilder) {

		if (nodeTemplate.getId() != null) {
			throw new EntityAlreadyExistException("NodeTemplateAlreadyExistException: Unable to create NodeTemplate. NodeTemplate with id " + nodeTemplate.getId() + " already exist.");
		}

		NodeTemplate saved = nodeTemplateService.create(nodeTemplate);

		return ResponseEntity.created(ucBuilder.path("/api/nodeTemplates/{id}").buildAndExpand(nodeTemplate.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateNodeTemplate - Update a NodeTemplate if it exist in the database
	 * 
	 * @return ResponseEntity<NodeTemplate> - Return the updated NodeTemplate
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateNodeTemplate(@PathVariable("id") long id, @RequestBody NodeTemplate nodeTemplate) {

		NodeTemplate currentNodeTemplate = nodeTemplateService.findById(id);

		if (currentNodeTemplate == null) {
			throw new EntityNotFoundException("NodeTemplateNotFoundException: Unable to update. NodeTemplate with id " + id + " not found.");
		}

		currentNodeTemplate = nodeTemplate;

		nodeTemplateService.update(currentNodeTemplate);
		return ResponseEntity.ok().body(currentNodeTemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteRepository - Delete a NodeTemplate if it exist in the database
	 * 
	 * @return ResponseEntity<NodeTemplate> - return no NodeTemplate
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteNodeTemplate(@PathVariable("id") Long id) {

		NodeTemplate nodeTemplate = nodeTemplateService.findById(id);

		if (nodeTemplate == null) {
			throw new EntityNotFoundException("NodeTemplateNotFoundException: Unable to delete NodeTemplate. NodeTemplate with id " + id + " not found.");
		}

		nodeTemplateService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllRepositories - Delete all available NodeTemplates in the database
	 * 
	 * @return ResponseEntity<Void> - return no NodeTemplate
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllRepositories() {

		nodeTemplateService.deleteAllNodeTemplates();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the Repository RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler(EntityNotFoundException.class)
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
