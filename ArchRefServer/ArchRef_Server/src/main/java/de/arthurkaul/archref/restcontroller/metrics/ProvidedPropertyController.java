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
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.services.metrics.ProvidedPropertyService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class ProvidedPropertyController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the ProvidedProperty data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/providedproperties")
public class ProvidedPropertyController {

	@Autowired
	ProvidedPropertyService providedPropertySerivce;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllProvidedProperties - Call the ProvidedProperty Service and retrieve all available ProvidedProperties and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<ProvidedProperty>> - Response with a collection of all available ProvidedProperties in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<ProvidedProperty>> getAllProvidedProperties() {

		Collection<ProvidedProperty> providedProperties = providedPropertySerivce.findAllProvidedProperties();

		if (providedProperties.isEmpty()) {
			throw new EntityNotFoundException("ProvidedPropertyNotFoundException: No ProvidedProperty found. No ProvidedProperty exist.");
		}
		return ResponseEntity.ok().body(providedProperties);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getProvidedProperty - Call the ProvidedProperty Service and look for a ProvidedProperty with a certain id. If a ProvidedProperty with this id exist in the database then retrieve it
	 *         and send it back to the client in a response
	 * 
	 * @return ResponseEntity<ProvidedProperty> - Response with only one ProvidedProperty in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProvidedProperty> getProvidedProperty(@PathVariable("id") long id) {

		ProvidedProperty providedProperty = providedPropertySerivce.findById(id);

		if (providedProperty == null) {
			throw new EntityNotFoundException("ProvidedPropertyNotFoundException: Unable to find ProvidedProperty. ProvidedProperty with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(providedProperty);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createProvidedProperty - Create a new Repository in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<Repository> - Return the created repository with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ProvidedProperty> createProvidedProperty(@RequestBody ProvidedProperty providedProperty, UriComponentsBuilder ucBuilder) {

		if (providedProperty.getId() != null) {
			throw new EntityAlreadyExistException("ProvidedPropertyAlreadyExistException: Unable to create ProvidedProperty. ProvidedProperty with id " + providedProperty.getId() + " already exist.");
		}
		ProvidedProperty saved = providedPropertySerivce.create(providedProperty);

		return ResponseEntity.created(ucBuilder.path("/api/providedproperties/{id}").buildAndExpand(saved.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateProvidedProperty - Update a ProvidedProperty if it exist in the database
	 * 
	 * @return ResponseEntity<ProvidedProperty> - Return the updated ProvidedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ProvidedProperty> updateProvidedProperty(@PathVariable("id") long id, @RequestBody ProvidedProperty providedProperty) {

		ProvidedProperty currentProvidedProperty = providedPropertySerivce.findById(id);

		if (currentProvidedProperty == null) {
			throw new EntityNotFoundException("ProvidedPropertyNotFoundException: Unable to update ProvidedProperty. ProvidedProperty with id " + id + " not found.");
		}
		currentProvidedProperty = providedProperty;
		providedPropertySerivce.update(currentProvidedProperty);
		return ResponseEntity.ok().body(currentProvidedProperty);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteProvidedProperty - Delete a ProvidedProperty if it exist in the database
	 * 
	 * @return ResponseEntity<ProvidedProperty> - return no ProvidedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProvidedProperty(@PathVariable("id") Long id) {

		ProvidedProperty providedProperty = providedPropertySerivce.findById(id);

		if (providedProperty == null) {
			throw new EntityNotFoundException("ProvidedPropertyNotFoundException: Unable to delete ProvidedProperty. ProvidedProperty with id " + id + " not found.");
		}

		providedPropertySerivce.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteProvidedProperties - Delete all available ProvidedProperties in the database
	 * 
	 * @return ResponseEntity<Void> - return no ProvidedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProvidedProperties() {

		providedPropertySerivce.deleteAllProvidedProperties();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the ProvidedPropertys RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
