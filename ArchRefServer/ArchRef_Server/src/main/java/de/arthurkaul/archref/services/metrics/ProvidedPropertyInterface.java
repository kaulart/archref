package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import de.arthurkaul.archref.model.metrics.ProvidedProperty;

public interface ProvidedPropertyInterface {
	
	Collection<ProvidedProperty> findAllProvidedProperties();

	ProvidedProperty findById(long id);

	ProvidedProperty create(ProvidedProperty providedProperty);

	ProvidedProperty update(ProvidedProperty providedProperty);

	void delete(long id);

	void deleteAllProvidedProperties();

}
