package de.arthurkaul.archref.restcontroller.metrics;

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
import de.arthurkaul.archref.model.metrics.Property;
import de.arthurkaul.archref.services.metrics.PropertyService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class PropertyController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the Property data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

	@Autowired
	PropertyService propertyService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllProperties - Call the Property Service and retrieve all available Properties and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<Property>> - Response with a collection of all available Propertyies in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<Property>> getAllProperties() {

		Collection<Property> properties = propertyService.findAllProperties();

		if (properties.isEmpty()) {
			throw new EntityNotFoundException("PropertyNotFoundException: No Property found. No Property exist.");
		}
		return ResponseEntity.ok().body(properties);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getProperty - Call the Property Service and look for a Property with a certain id. If a repository with this id exist in the database then retrieve it and send it back to the client
	 *         in a response
	 * 
	 * @return ResponseEntity<Property> - Response with only one Property in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Property> getProperty(@PathVariable("id") long id) {

		Property property = propertyService.findById(id);

		if (property == null) {
			throw new EntityNotFoundException("PropertyFoundException: Unable to find Property. Property with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(property);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createProperty - Create a new Property in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<Property> - Return the created Property with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Property> createProperty(@RequestBody Property property, UriComponentsBuilder ucBuilder) {

		if (property.getId() != null) {
			throw new EntityAlreadyExistException("PropertyAlreadyExistException: Unable to create Property. Property with id " + property.getId() + " already exist.");
		}
		Property saved = propertyService.create(property);

		return ResponseEntity.created(ucBuilder.path("/api/propterties/{id}").buildAndExpand(saved.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateProperty - Update a Property if it exist in the database
	 * 
	 * @return ResponseEntity<Property> - Return the updated Property
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Property> updateProperty(@PathVariable("id") long id, @RequestBody Property property) {

		Property currentProperty = propertyService.findById(id);

		if (currentProperty == null) {
			throw new EntityNotFoundException("PropertyNotFoundException: Unable to update Property. Property with id " + id + " not found.");
		}
		currentProperty = property;
		propertyService.update(currentProperty);
		return ResponseEntity.ok().body(currentProperty);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteProperty - Delete a Repository if it exist in the database
	 * 
	 * @return ResponseEntity<Repository> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProperty(@PathVariable("id") Long id) {

		Property property = propertyService.findById(id);

		if (property == null) {
			throw new EntityNotFoundException("PropertyNotFoundException: Unable to delete Property. Property with id " + id + " not found.");
		}

		propertyService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteProperties - Delete all available repositories in the database
	 * 
	 * @return ResponseEntity<Void> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProperties() {

		propertyService.deleteAllProperties();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the Property RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
