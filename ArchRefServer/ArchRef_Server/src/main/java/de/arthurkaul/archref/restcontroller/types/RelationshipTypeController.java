package de.arthurkaul.archref.restcontroller.types;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import de.arthurkaul.archref.exceptions.EntityAlreadyExistException;
import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.types.RelationshipType;
import de.arthurkaul.archref.services.types.RelationshipTypeService;

@RestController
public class RelationshipTypeController {

	@Autowired
	RelationshipTypeService relationshipTypeService;
	

	@RequestMapping(value="/api/relationshiptypes", method = RequestMethod.GET)
	public ResponseEntity<Collection<RelationshipType>> getAllRelationshipTypes() {
	
		Collection<RelationshipType> relationshipTypes =  relationshipTypeService.findAllRelationshipTypes();
		
		  if (relationshipTypes.isEmpty()) {
			
			  throw new EntityNotFoundException("RelationshipTypeNotFoundException: No RelationshipType found. No RelationshipType exist.");  
         
      }
       return ResponseEntity.ok().body(relationshipTypes);
	}
	

	@RequestMapping(value="/api/relationshiptypes/{id}", method = RequestMethod.GET)
	public ResponseEntity<RelationshipType> getRelationshipType(@PathVariable("id") long id) {

		RelationshipType relationshipType = relationshipTypeService.findById(id);
		
		  if (relationshipType == null) {
			throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to find RelationshipType. RelationshipType with id " + id + " not found.");          	
      
      }
		return ResponseEntity.ok().body(relationshipType);
	}
	
	
	@RequestMapping(value = "/api/relationshiptypes", method = RequestMethod.POST)
   public ResponseEntity<RelationshipType> createRelationshipType(@RequestBody RelationshipType relationshipType, UriComponentsBuilder ucBuilder) {
	
		if (relationshipType.getId() != null) {
			throw new EntityAlreadyExistException("RelationshipTypeAlreadyExistException: Unable to create NodeType. RelationshipType with id " + relationshipType.getId() + " already exist.");          	
        }
		
		RelationshipType saved = relationshipTypeService.create(relationshipType);
		
       return ResponseEntity.created(ucBuilder.path("/api/relationshiptype/{id}").buildAndExpand(relationshipType.getId()).toUri()).body(saved);
      
    }

   @RequestMapping(value = "/api/relationshiptypes/{id}", method = RequestMethod.PUT)
   public ResponseEntity<RelationshipType> updateRelationshipType(@PathVariable("id") long id, @RequestBody RelationshipType relationshipType) {

	   RelationshipType currentRelationshipType = relationshipTypeService.findById(id);

       if (currentRelationshipType == null) {
       	     throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to update RelationshipType. RelationshipType with id " + id + " not found.");          
       }
       currentRelationshipType = relationshipType;
//       currentRelationshipType.setName(relationshipType.getName());
//       currentRelationshipType.setIcon(relationshipType.getIcon());
//       currentRelationshipType.setProvidedProperties(relationshipType.getProvidedProperties());

       relationshipTypeService.update(currentRelationshipType);
       return ResponseEntity.ok().body(currentRelationshipType);
   }


   @RequestMapping(value = "/api/relationshiptypes/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteRelationshipType(@PathVariable("id") Long id) {

	   RelationshipType relationshipTypes = relationshipTypeService.findById(id);
		
		if (relationshipTypes  == null) {
			throw new EntityNotFoundException("RelationshipTypeNotFoundException: Unable to delete RelationshipType. RelationshipType with id " + id + " not found.");          	
       }
		
		relationshipTypeService.delete(id);

       return ResponseEntity.noContent().build();
   }

   @RequestMapping(value = "/api/relationshiptypes", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteAllRelationshipTypes() {

	   relationshipTypeService.deleteAllRelationshipTypes();
       return ResponseEntity.noContent().build();
   }
	
	
	 @ExceptionHandler({EntityNotFoundException.class, EntityAlreadyExistException.class})  
	 
	    public String exceptionHandler(Exception e){  
	
		 return e.getMessage();  
	       	        
	    }  
	
}
