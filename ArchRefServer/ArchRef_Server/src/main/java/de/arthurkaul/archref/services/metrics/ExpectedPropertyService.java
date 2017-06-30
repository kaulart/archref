package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;
import de.arthurkaul.archref.model.metrics.Property;
import de.arthurkaul.archref.repositories.metrics.ExpectedPropertyRepository;

@Service
public class ExpectedPropertyService implements ExpectedPropertyInterface {

	@Autowired
	ExpectedPropertyRepository expectedPropertyRepository;

	@Override
	public Collection<ExpectedProperty> findAllExpectedProperties() {
		return expectedPropertyRepository.findAll();
	}

	@Override
	public ExpectedProperty findById(long id) {
		return expectedPropertyRepository.findOne(id);
	}

	@Override
	public ExpectedProperty create(ExpectedProperty expectedProperty) {
		if (expectedProperty.getId() != null) {
			return null;
		}

		return expectedPropertyRepository.save(expectedProperty);
	}

	@Override
	public ExpectedProperty update(ExpectedProperty expectedProperty) {
		Property persistedProperty = expectedPropertyRepository.findOne(expectedProperty.getId());

		if (persistedProperty == null) {
			return null;
		}
		return expectedPropertyRepository.save(expectedProperty);
	}

	@Override
	public void delete(long id) {
		expectedPropertyRepository.delete(id);

	}

	@Override
	public void deleteAllExpectedProperties() {
		expectedPropertyRepository.deleteAll();
	}

}
