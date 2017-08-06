package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.metrics.Property;
import de.arthurkaul.archref.repositories.metrics.PropertyRepository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Service - PropertyService is the Service for the Property Data it implements CRUD methods which create, update, retrieve and delete data from and in the database
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Service
public class PropertyService implements PropertyInterface {

	@Autowired
	PropertyRepository propertyRepository;

	@Override
	public Collection<Property> findAllProperties() {
		return propertyRepository.findAll();
	}

	@Override
	public Property findById(long id) {
		return propertyRepository.findOne(id);
	}

	@Override
	public Property create(Property property) {

		if (property.getId() != null) {
			return null;
		}

		return propertyRepository.save(property);

	}

	@Override
	public Property update(Property property) {
		Property persistedProperty = propertyRepository.findOne(property.getId());

		if (persistedProperty == null) {
			return null;
		}

		return propertyRepository.save(property);
	}

	@Override
	public void delete(long id) {
		propertyRepository.delete(id);

	}

	@Override
	public void deleteAllProperties() {
		propertyRepository.deleteAll();

	}

}
