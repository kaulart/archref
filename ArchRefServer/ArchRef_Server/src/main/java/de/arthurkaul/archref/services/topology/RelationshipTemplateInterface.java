package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import de.arthurkaul.archref.model.topology.RelationshipTemplate;


public interface RelationshipTemplateInterface {


	  Collection<RelationshipTemplate> findAllRelationshipTemplates();
	    
	  RelationshipTemplate findById(long id);

	  RelationshipTemplate create(RelationshipTemplate relationshipTemplate);

	  RelationshipTemplate update(RelationshipTemplate relationshipTemplate);

	  void delete(long id);
	    
	  void deleteAllRelationshipTemplates();
}
