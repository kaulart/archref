package de.arthurkaul.archref.services.metrics;

import java.util.Collection;

import de.arthurkaul.archref.model.metrics.Property;

public interface PropertyInterface {
		
	    Collection<Property> findAllProperties();
	    
	    Property findById(long id);

	    Property create(Property property);

	    Property update(Property property);

	    void delete(long id);
	    
	    void deleteAllProperties();
	    
}
