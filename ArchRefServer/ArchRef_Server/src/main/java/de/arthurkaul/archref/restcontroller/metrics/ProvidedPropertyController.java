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

@RestController
public class ProvidedPropertyController {

	@Autowired
	ProvidedPropertyService providedPropertySerivce;
	
	@RequestMapping(value = "/api/providedproperties", method = RequestMethod.GET)
	public ResponseEntity<Collection<ProvidedProperty>> getAllProvidedProperties() {

		Collection<ProvidedProperty> providedProperties = providedPropertySerivce.findAllProvidedProperties();

		if (providedProperties.isEmpty()) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");
		}
		return ResponseEntity.ok().body(providedProperties);
	}
	
	@RequestMapping(value = "/api/providedproperties/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProvidedProperty> getProvidedProperty(@PathVariable("id") long id) {

		ProvidedProperty providedProperty = providedPropertySerivce.findById(id);

		if (providedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(providedProperty);
	}

	@RequestMapping(value = "/api/providedproperties", method = RequestMethod.POST)
	public ResponseEntity<ProvidedProperty> createProvidedProperty(@RequestBody ProvidedProperty providedProperty, UriComponentsBuilder ucBuilder) {
		
		if (providedProperty.getId() != null) {
			throw new EntityAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + providedProperty.getId()
							+ " already exist.");
		}
		ProvidedProperty saved = providedPropertySerivce.create(providedProperty);

		return ResponseEntity.created(ucBuilder.path("/api/providedproperties/{id}").buildAndExpand(saved.getId()).toUri())
				.body(saved);

	}
	
	@RequestMapping(value = "/api/providedproperties/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ProvidedProperty> updateProvidedProperty(@PathVariable("id") long id, @RequestBody ProvidedProperty providedProperty) {

		ProvidedProperty currentProvidedProperty = providedPropertySerivce.findById(id);

		if (currentProvidedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}
		currentProvidedProperty = providedProperty;
		providedPropertySerivce.update(currentProvidedProperty);
		return ResponseEntity.ok().body(currentProvidedProperty);
	}

	@RequestMapping(value = "/api/providedproperties/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProvidedProperty(@PathVariable("id") Long id) {

		ProvidedProperty providedProperty = providedPropertySerivce.findById(id);

		if (providedProperty == null) {
			throw new EntityNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		providedPropertySerivce.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/providedproperties", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProvidedProperties() {

		providedPropertySerivce.deleteAllProvidedProperties();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler({EntityNotFoundException.class, EntityAlreadyExistException.class})

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}
	
}
