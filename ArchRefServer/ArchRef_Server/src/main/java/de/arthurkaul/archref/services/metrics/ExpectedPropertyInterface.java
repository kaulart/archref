package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import de.arthurkaul.archref.model.metrics.ExpectedProperty;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - ExpectedPropertyInterface is the Interface for the ExpectedPropertyService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface ExpectedPropertyInterface {

	Collection<ExpectedProperty> findAllExpectedProperties();

	ExpectedProperty findById(long id);

	ExpectedProperty create(ExpectedProperty expectedProperty);

	ExpectedProperty update(ExpectedProperty expectedProperty);

	void delete(long id);

	void deleteAllExpectedProperties();

}
