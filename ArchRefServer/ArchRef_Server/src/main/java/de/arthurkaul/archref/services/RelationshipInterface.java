package de.arthurkaul.archref.services;

import java.util.Collection;

import de.arthurkaul.archref.model.relation.RelationshipType;


public interface RelationshipInterface {

	  Collection<RelationshipType> findAllRelationshipTypes();
	    
	  RelationshipType findById(long id);

	  RelationshipType create(RelationshipType relationshipType);

	  RelationshipType update(RelationshipType relationshipType);

	  void delete(long id);
	    
	  void deleteAllRelationshipTypes();
}
