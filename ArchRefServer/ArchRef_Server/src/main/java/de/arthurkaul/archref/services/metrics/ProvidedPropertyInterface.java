package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import de.arthurkaul.archref.model.metrics.ProvidedProperty;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - ProvidedPropertyInterface is the Interface for the ProvidedPropertyService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface ProvidedPropertyInterface {

	Collection<ProvidedProperty> findAllProvidedProperties();

	ProvidedProperty findById(long id);

	ProvidedProperty create(ProvidedProperty providedProperty);

	ProvidedProperty update(ProvidedProperty providedProperty);

	void delete(long id);

	void deleteAllProvidedProperties();

}
