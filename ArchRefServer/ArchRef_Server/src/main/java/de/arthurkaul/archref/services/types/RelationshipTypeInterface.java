package de.arthurkaul.archref.services.types;

import java.util.Collection;

import de.arthurkaul.archref.model.types.RelationshipType;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - RelationshipTypeInterface - Interface for the RelationshipTypes define all Methods which should be implemented by this interface
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface RelationshipTypeInterface {

	Collection<RelationshipType> findAllRelationshipTypes();

	RelationshipType findById(long id);

	RelationshipType create(RelationshipType relationshipType);

	RelationshipType update(RelationshipType relationshipType);

	void delete(long id);

	void deleteAllRelationshipTypes();
}
