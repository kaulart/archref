package de.arthurkaul.archref.services.types;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.types.RelationshipType;
import de.arthurkaul.archref.repositories.types.RelationshipTypeRepository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Service - RelationshipTypeService is the Service for the RelationshipType Data it implements CRUD methods which create, update, retrieve and delete data from and in the database
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Service
public class RelationshipTypeService implements RelationshipTypeInterface {

	@Autowired
	RelationshipTypeRepository relationshipRepository;

	@Override
	public Collection<RelationshipType> findAllRelationshipTypes() {
		return relationshipRepository.findAll();
	}

	@Override
	public RelationshipType findById(long id) {
		return relationshipRepository.findOne(id);
	}

	@Override
	public RelationshipType create(RelationshipType relationshipType) {

		if (relationshipType.getId() != null) {
			return null;
		}

		return relationshipRepository.save(relationshipType);
	}

	@Override
	public RelationshipType update(RelationshipType relationshipType) {

		RelationshipType persistedRelationshipType = relationshipRepository.findOne(relationshipType.getId());

		if (persistedRelationshipType == null) {
			return null;
		}

		return relationshipRepository.save(relationshipType);
	}

	@Override
	public void delete(long id) {
		relationshipRepository.delete(id);

	}

	@Override
	public void deleteAllRelationshipTypes() {
		relationshipRepository.deleteAll();
	}

}
