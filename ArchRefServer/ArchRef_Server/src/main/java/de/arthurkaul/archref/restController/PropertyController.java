package de.arthurkaul.archref.restController;

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

import de.arthurkaul.archref.exceptions.LevelGraphAlreadyExistException;
import de.arthurkaul.archref.exceptions.LevelGraphNotFoundException;
import de.arthurkaul.archref.model.metrics.Property;
import de.arthurkaul.archref.services.PropertyService;

@RestController
public class PropertyController {
	
	@Autowired
	PropertyService propertyService;
	
	@RequestMapping(value = "/api/properties", method = RequestMethod.GET)
	public ResponseEntity<Collection<Property>> getAllProperties() {

		Collection<Property> properties = propertyService.findAllProperties();

		if (properties.isEmpty()) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");
		}
		return ResponseEntity.ok().body(properties);
	}
	
	@RequestMapping(value = "/api/properties/{id}", method = RequestMethod.GET)
	public ResponseEntity<Property> getProperty(@PathVariable("id") long id) {

		Property property = propertyService.findById(id);

		if (property == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(property);
	}

	@RequestMapping(value = "/api/properties", method = RequestMethod.POST)
	public ResponseEntity<Property> createProperty(@RequestBody Property property, UriComponentsBuilder ucBuilder) {
		
		if (property.getId() != null) {
			throw new LevelGraphAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + property.getId()
							+ " already exist.");
		}
		Property saved = propertyService.create(property);

		return ResponseEntity.created(ucBuilder.path("/api/propterties/{id}").buildAndExpand(saved.getId()).toUri())
				.body(saved);

	}
	
	@RequestMapping(value = "/api/properties/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Property> updateProperty(@PathVariable("id") long id, @RequestBody Property property) {

		Property currentProperty = propertyService.findById(id);

		if (currentProperty == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}
		currentProperty = property;
		propertyService.update(currentProperty);
		return ResponseEntity.ok().body(currentProperty);
	}

	@RequestMapping(value = "/api/properties/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProperty(@PathVariable("id") Long id) {

		Property property = propertyService.findById(id);

		if (property == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		propertyService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/properties", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProperties() {

		propertyService.deleteAllProperties();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(LevelGraphNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}
	
}
