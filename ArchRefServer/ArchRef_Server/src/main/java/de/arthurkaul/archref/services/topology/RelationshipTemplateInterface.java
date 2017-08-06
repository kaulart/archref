package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import de.arthurkaul.archref.model.topology.RelationshipTemplate;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - RelationshipTemplateInterface - Interface for the RelationshipTemplate define all Methods which should be implemented by this interface.
 * 
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface RelationshipTemplateInterface {

	Collection<RelationshipTemplate> findAllRelationshipTemplates();

	RelationshipTemplate findById(long id);

	RelationshipTemplate create(RelationshipTemplate relationshipTemplate);

	RelationshipTemplate update(RelationshipTemplate relationshipTemplate);

	void delete(long id);

	void deleteAllRelationshipTemplates();
}
