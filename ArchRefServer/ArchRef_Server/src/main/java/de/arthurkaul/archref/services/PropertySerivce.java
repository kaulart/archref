package de.arthurkaul.archref.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.Property;
import de.arthurkaul.archref.repositories.PropertyRepository;

@Service
public class PropertySerivce implements PropertyInterface {

	@Autowired
	PropertyRepository proptertyRepository;

	@Override
	public Collection<Property> findAllProperties() {
		return proptertyRepository.findAll();
	}

	@Override
	public Property findById(long id) {
		return proptertyRepository.findOne(id);
	}

	@Override
	public Property create(Property property) {
		if (property.getId() != null) {
			return proptertyRepository.save(property);
		}

		return null;
	}

	@Override
	public Property update(Property property) {
		Property persistedProperty = proptertyRepository.findOne(property.getId());

		if (persistedProperty == null) {
			return null;
		}

		return  proptertyRepository.save(property);
	}

	@Override
	public void delete(long id) {
		proptertyRepository.delete(id);

	}

	@Override
	public void deleteAllProperties() {
		proptertyRepository.deleteAll();

	}

}
