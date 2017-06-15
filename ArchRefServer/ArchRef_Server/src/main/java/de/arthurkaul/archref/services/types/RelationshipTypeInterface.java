package de.arthurkaul.archref.services.types;

import java.util.Collection;

import de.arthurkaul.archref.model.types.RelationshipType;


public interface RelationshipTypeInterface {

	  Collection<RelationshipType> findAllRelationshipTypes();
	    
	  RelationshipType findById(long id);

	  RelationshipType create(RelationshipType relationshipType);

	  RelationshipType update(RelationshipType relationshipType);

	  void delete(long id);
	    
	  void deleteAllRelationshipTypes();
}
