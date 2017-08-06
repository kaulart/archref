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
import de.arthurkaul.archref.model.topology.TopologyTemplate;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class TopologyTemplateController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the TopologyTemplate data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/topologytemplates")
public class TopologyTemplateController {

	@Autowired
	TopologyTemplateService topologyTemplateService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllTopologyTemplates - Call the TopologyTemplate Service and retrieve all available TopologyTemplates and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<TopologyTemplate>> - Response with a collection of all available TopologyTemplate in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<TopologyTemplate>> getAllTopologyTemplates() {

		Collection<TopologyTemplate> topologyTemplates = topologyTemplateService.findAllTopologyTemplate();

		if (topologyTemplates.isEmpty()) {
			throw new EntityNotFoundException("TopologyTemplateNotFoundException: No TopologyTemplate found. No TopologyTemplate exist.");
		}
		return ResponseEntity.ok().body(topologyTemplates);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getTopologyTemplate - Call the TopologyTemplate Service and look for a TopologyTemplate with a certain id. If a TopologyTemplate with this id exist in the database then retrieve it
	 *         and send it back to the client in a response
	 * 
	 * @return ResponseEntity<TopologyTemplate> - Response with only one TopologyTemplate in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<TopologyTemplate> getTopologyTemplate(@PathVariable("id") long id) {

		TopologyTemplate topologyTemplate = topologyTemplateService.findById(id);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("TopologyTemplateNotFoundException: Unable to find TopologyTemplate. TopologyTemplate with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(topologyTemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createTopologyTemplate - Create a new TopologyTemplate in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<TopologyTemplate> - Return the created TopologyTemplate with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<TopologyTemplate> createTopologyTemplate(@RequestBody TopologyTemplate topologyTemplate, UriComponentsBuilder ucBuilder) {

		if (topologyTemplate.getId() != null) {
			throw new EntityAlreadyExistException("TopologyTemplateAlreadyExistException: Unable to create TopologyTemplate. TopologyTemplate with id " + topologyTemplate.getId() + " already exist.");
		}

		TopologyTemplate saved = topologyTemplateService.create(topologyTemplate);

		return ResponseEntity.created(ucBuilder.path("/api/topologytemplates/{id}").buildAndExpand(topologyTemplate.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateTopologyTemplate - Update a Repository if it exist in the database
	 * 
	 * @return ResponseEntity<Repository> - Return the updated repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTopologyTemplate(@PathVariable("id") long id, @RequestBody TopologyTemplate topologyTemplate) {

		TopologyTemplate currentTopologyTemplate = topologyTemplateService.findById(id);

		if (currentTopologyTemplate == null) {
			throw new EntityNotFoundException("TopologyTemplateNotFoundException: Unable to update. TopologyTemplate with id " + id + " not found.");
		}

		currentTopologyTemplate.setName(topologyTemplate.getName());

		topologyTemplateService.update(topologyTemplate);
		return ResponseEntity.ok().body(currentTopologyTemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteTopologyTemplate - Delete a Repository if it exist in the database
	 * 
	 * @return ResponseEntity<Repository> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteTopologyTemplate(@PathVariable("id") Long id) {

		TopologyTemplate topologyTemplate = topologyTemplateService.findById(id);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("TopologyTemplateNotFoundException: Unable to delete TopologyTemplate. TopologyTemplate with id " + id + " not found.");
		}

		topologyTemplateService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteTopologyTemplates - Delete all available repositories in the database
	 * 
	 * @return ResponseEntity<Void> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteTopologyTemplates() {

		topologyTemplateService.deleteAllTopologyTemplates();
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
