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

@RestController
public class ExpectedPropertyController {

	@Autowired
	ExpectedPropertyService expectedPropertyService;
	
	@RequestMapping(value = "/api/expectedproperties", method = RequestMethod.GET)
	public ResponseEntity<Collection<ExpectedProperty>> getAllExpectedProperties() {

		Collection<ExpectedProperty> expectedProperties = expectedPropertyService.findAllExpectedProperties();

		if (expectedProperties.isEmpty()) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");
		}
		return ResponseEntity.ok().body(expectedProperties);
	}
	
	@RequestMapping(value = "/api/expectedproperties/{id}", method = RequestMethod.GET)
	public ResponseEntity<ExpectedProperty> getExpectedProperty(@PathVariable("id") long id) {

		ExpectedProperty expectedProperty = expectedPropertyService.findById(id);

		if (expectedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(expectedProperty);
	}

	@RequestMapping(value = "/api/expectedproperties", method = RequestMethod.POST)
	public ResponseEntity<ExpectedProperty> createExpectedProperty(@RequestBody ExpectedProperty expectedProperty, UriComponentsBuilder ucBuilder) {
		
		if (expectedProperty.getId() != null) {
			throw new EntityAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + expectedProperty.getId()
							+ " already exist.");
		}
		ExpectedProperty saved = expectedPropertyService.create(expectedProperty);

		return ResponseEntity.created(ucBuilder.path("/api/expectedproperties/{id}").buildAndExpand(saved.getId()).toUri())
				.body(saved);

	}
	
	@RequestMapping(value = "/api/expectedproperties/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ExpectedProperty> updateExpectedProperty(@PathVariable("id") long id, @RequestBody ExpectedProperty expectedProperty) {

		ExpectedProperty currentExpectedProperty = expectedPropertyService.findById(id);

		if (currentExpectedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}
		currentExpectedProperty = expectedProperty;
		expectedPropertyService.update(currentExpectedProperty);
		return ResponseEntity.ok().body(currentExpectedProperty);
	}

	@RequestMapping(value = "/api/expectedproperties/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteExpectedProperty(@PathVariable("id") Long id) {

		ExpectedProperty expectedProperty = expectedPropertyService.findById(id);

		if (expectedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		expectedPropertyService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/expectedproperties", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteExpectedProperties() {

		expectedPropertyService.deleteAllExpectedProperties();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(EntityNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}
	
}
