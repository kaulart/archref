package de.arthurkaul.archref.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.relation.RelationshipType;
import de.arthurkaul.archref.repositories.RelationshipTypeRepository;

@Service
public class RelationshipService implements RelationshipInterface{

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
            return relationshipRepository.save(relationshipType);
        }
		
		return null;
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
