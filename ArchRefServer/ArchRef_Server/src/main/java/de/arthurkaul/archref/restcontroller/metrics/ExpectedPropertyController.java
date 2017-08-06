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
import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.services.metrics.ExpectedPropertyService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class ExpectedPropertyController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the ExpectedProperty data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/expectedproperties")
public class ExpectedPropertyController {

	@Autowired
	ExpectedPropertyService expectedPropertyService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllExpectedProperties - Call the ExpectedProperty Service and retrieve all available ExpectedProperties and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<ExpectedProperty>> - Response with a collection of all available ExpectedProperties in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<ExpectedProperty>> getAllExpectedProperties() {

		Collection<ExpectedProperty> expectedProperties = expectedPropertyService.findAllExpectedProperties();

		if (expectedProperties.isEmpty()) {
			throw new EntityNotFoundException("ExpectedPropertyNotFoundException: No ExpectedProperty found. No ExpectedProperty exist.");
		}
		return ResponseEntity.ok().body(expectedProperties);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getExpectedProperty - Call the ExpectedProperty Service and look for a ExpectedProperty with a certain id. If a repository with this id exist in the database then retrieve it and send
	 *         it back to the client in a response
	 * 
	 * @return ResponseEntity<ExpectedProperty> - Response with only one ExpectedProperty in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ExpectedProperty> getExpectedProperty(@PathVariable("id") long id) {

		ExpectedProperty expectedProperty = expectedPropertyService.findById(id);

		if (expectedProperty == null) {
			throw new EntityNotFoundException("ExpectedPropertyNotFoundException: Unable to find ExpectedProperty. ExpectedProperty with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(expectedProperty);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createExpectedProperty - Create a new ExpectedProperty in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<ExpectedProperty> - Return the created ExpectedProperty with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<ExpectedProperty> createExpectedProperty(@RequestBody ExpectedProperty expectedProperty, UriComponentsBuilder ucBuilder) {

		if (expectedProperty.getId() != null) {
			throw new EntityAlreadyExistException("ExpectedPropertyAlreadyExistException: Unable to create ExpectedProperty. ExpectedProperty with id " + expectedProperty.getId() + " already exist.");
		}
		ExpectedProperty saved = expectedPropertyService.create(expectedProperty);

		return ResponseEntity.created(ucBuilder.path("/api/expectedproperties/{id}").buildAndExpand(saved.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateExpectedProperty - Update a ExpectedProperty if it exist in the database
	 * 
	 * @return ResponseEntity<ExpectedProperty> - Return the updated ExpectedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ExpectedProperty> updateExpectedProperty(@PathVariable("id") long id, @RequestBody ExpectedProperty expectedProperty) {

		ExpectedProperty currentExpectedProperty = expectedPropertyService.findById(id);

		if (currentExpectedProperty == null) {
			throw new EntityNotFoundException("ExpectedPropertyFoundException: Unable to update ExpectedProperty. ExpectedProperty with id " + id + " not found.");
		}
		currentExpectedProperty = expectedProperty;
		expectedPropertyService.update(currentExpectedProperty);
		return ResponseEntity.ok().body(currentExpectedProperty);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteExpectedProperty - Delete a ExpectedProperty if it exist in the database
	 * 
	 * @return ResponseEntity<ExpectedProperty> - return no ExpectedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteExpectedProperty(@PathVariable("id") Long id) {

		ExpectedProperty expectedProperty = expectedPropertyService.findById(id);

		if (expectedProperty == null) {
			throw new EntityNotFoundException("ExpectedPropertyNotFoundException: Unable to delete ExpectedProperty. ExpectedProperty with id " + id + " not found.");
		}

		expectedPropertyService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteExpectedProperties - Delete all available ExpectedProperties in the database
	 * 
	 * @return ResponseEntity<Void> - return no ExpectedProperty
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteExpectedProperties() {

		expectedPropertyService.deleteAllExpectedProperties();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the ExpectedProperty RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler(EntityNotFoundException.class)
	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}

}
