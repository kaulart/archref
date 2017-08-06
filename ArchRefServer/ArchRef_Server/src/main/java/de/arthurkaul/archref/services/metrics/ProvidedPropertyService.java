package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.metrics.Property;
import de.arthurkaul.archref.model.metrics.ProvidedProperty;
import de.arthurkaul.archref.repositories.metrics.ProvidedPropertyRepository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Service - ProvidedPropertyService is the Service for the ProvidedProperty Data it implements CRUD methods which create, update, retrieve and delete data from and in the database
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Service
public class ProvidedPropertyService implements ProvidedPropertyInterface {

	@Autowired
	ProvidedPropertyRepository providedPropertyRepository;

	@Override
	public Collection<ProvidedProperty> findAllProvidedProperties() {
		return providedPropertyRepository.findAll();
	}

	@Override
	public ProvidedProperty findById(long id) {
		return providedPropertyRepository.findOne(id);
	}

	@Override
	public ProvidedProperty create(ProvidedProperty providedProperty) {
		if (providedProperty.getId() != null) {
			return null;
		}

		return providedPropertyRepository.save(providedProperty);
	}

	@Override
	public ProvidedProperty update(ProvidedProperty providedProperty) {
		Property persistedProperty = providedPropertyRepository.findOne(providedProperty.getId());

		if (persistedProperty == null) {
			return null;
		}
		return providedPropertyRepository.save(providedProperty);
	}

	@Override
	public void delete(long id) {
		providedPropertyRepository.delete(id);
	}

	@Override
	public void deleteAllProvidedProperties() {
		providedPropertyRepository.deleteAll();
	}

}
