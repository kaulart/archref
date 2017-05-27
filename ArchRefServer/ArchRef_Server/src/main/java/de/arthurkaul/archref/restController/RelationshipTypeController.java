package de.arthurkaul.archref.restController;

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

import de.arthurkaul.archref.exceptions.RelationshipTypeAlreadyExistException;
import de.arthurkaul.archref.exceptions.RelationshipTypeNotFoundException;
import de.arthurkaul.archref.model.topologyTemplate.RelationshipType;
import de.arthurkaul.archref.services.RelationshipService;

@RestController
public class RelationshipTypeController {

	@Autowired
	RelationshipService relationTypeService;
	

	@RequestMapping(value="/api/relationshiptypes", method = RequestMethod.GET)
	public ResponseEntity<Collection<RelationshipType>> getAllRelationshipTypes() {
	
		Collection<RelationshipType> relationshipTypes =  relationTypeService.findAllRelationshipTypes();
		
		  if (relationshipTypes.isEmpty()) {
			
			  throw new RelationshipTypeNotFoundException("RelationshipTypeNotFoundException: No RelationshipType found. No RelationshipType exist.");  
         
      }
       return ResponseEntity.ok().body(relationshipTypes);
	}
	

	@RequestMapping(value="/api/relationshiptypes/{id}", method = RequestMethod.GET)
	public ResponseEntity<RelationshipType> getRelationshipType(@PathVariable("id") long id) {

		RelationshipType relationshipType = relationTypeService.findById(id);
		
		  if (relationshipType == null) {
			throw new RelationshipTypeNotFoundException("RelationshipTypeNotFoundException: Unable to find RelationshipType. RelationshipType with id " + id + " not found.");          	
      
      }
		return ResponseEntity.ok().body(relationshipType);
	}
	
	
	@RequestMapping(value = "/api/relationshiptypes", method = RequestMethod.POST)
   public ResponseEntity<RelationshipType> createRelationshipType(@RequestBody RelationshipType relationshipType, UriComponentsBuilder ucBuilder) {
	
		if (relationshipType.getId() != null) {
			throw new RelationshipTypeAlreadyExistException("RelationshipTypeAlreadyExistException: Unable to create NodeType. RelationshipType with id " + relationshipType.getId() + " already exist.");          	
        }
		RelationshipType saved = relationTypeService.create(relationshipType);
		
       return ResponseEntity.created(ucBuilder.path("/api/relationshiptype/{id}").buildAndExpand(relationshipType.getId()).toUri()).body(saved);
      
    }

   @RequestMapping(value = "/api/relationshiptypes/{id}", method = RequestMethod.PUT)
   public ResponseEntity<RelationshipType> updateRelationshipType(@PathVariable("id") long id, @RequestBody RelationshipType relationshipType) {

	   RelationshipType currentRelationshipType = relationTypeService.findById(id);

       if (currentRelationshipType == null) {
       	     throw new RelationshipTypeNotFoundException("RelationshipTypeNotFoundException: Unable to update RelationshipType. RelationshipType with id " + id + " not found.");          
       }

       currentRelationshipType = relationshipType;

       relationTypeService.update(currentRelationshipType);
       return ResponseEntity.ok().body(currentRelationshipType);
   }


   @RequestMapping(value = "/api/relationshiptypes/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteRelationshipType(@PathVariable("id") Long id) {

	   RelationshipType relationshipTypes = relationTypeService.findById(id);
		
		if (relationshipTypes  == null) {
			throw new RelationshipTypeNotFoundException("RelationshipTypeNotFoundException: Unable to delete RelationshipType. RelationshipType with id " + id + " not found.");          	
       }
		
		relationTypeService.delete(id);

       return ResponseEntity.noContent().build();
   }

   @RequestMapping(value = "/api/relationshiptypes", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteAllRelationshipTypes() {

	   relationTypeService.deleteAllRelationshipTypes();
       return ResponseEntity.noContent().build();
   }
	
	
	 @ExceptionHandler(RelationshipTypeNotFoundException.class)  
	 
	    public String exceptionHandler(Exception e){  
	
		 return e.getMessage();  
	       	        
	    }  
	
}
