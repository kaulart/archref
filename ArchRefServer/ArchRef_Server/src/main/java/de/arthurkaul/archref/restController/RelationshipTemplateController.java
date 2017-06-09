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

import de.arthurkaul.archref.exceptions.RepositoryAlreadyExistException;
import de.arthurkaul.archref.exceptions.RepositoryNotFoundException;
import de.arthurkaul.archref.model.topology.RelationshipTemplate;
import de.arthurkaul.archref.services.topology.RelationshipTemplateService;

@RestController
public class RelationshipTemplateController {

	@Autowired
	RelationshipTemplateService relationshipTemplateService;
	

	@RequestMapping(value="/api/relationshiptemplates", method = RequestMethod.GET)
	public ResponseEntity<Collection<RelationshipTemplate>> getAllRelationshipTemplates() {
		
		Collection<RelationshipTemplate> relationshiptemplates =  relationshipTemplateService.findAllRelationshipTemplates();
		
		  if (relationshiptemplates.isEmpty()) {
			  throw new RepositoryNotFoundException("RepositoryNotFoundException: No Repository found. No Repository exist.");  
      // You many decide to return HttpStatus.NOT_FOUND
   }
    return ResponseEntity.ok().body(relationshiptemplates);
	}
	

	@RequestMapping(value="/api/relationshiptemplates/{id}", method = RequestMethod.GET)
	public ResponseEntity<RelationshipTemplate> getRelationshipTemplate(@PathVariable("id") long id) {

		RelationshipTemplate relationshiptemplate = relationshipTemplateService.findById(id);
		
		  if (relationshiptemplate == null) {
			throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to find Repository. Repository with id " + id + " not found.");          	
   
   }
		return ResponseEntity.ok().body(relationshiptemplate);
	}
	
	
	@RequestMapping(value = "/api/relationshiptemplates", method = RequestMethod.POST)
public ResponseEntity<RelationshipTemplate> createRelationshipTemplate(@RequestBody RelationshipTemplate relationshiptemplate, UriComponentsBuilder ucBuilder) {
		
		if (relationshiptemplate.getId() != null) {
			throw new RepositoryAlreadyExistException("RepositoryAlreadyExistException: Unable to create Repository. Repository with id " + relationshiptemplate.getId() + " already exist.");          	
    }
		
		RelationshipTemplate saved = relationshipTemplateService.create(relationshiptemplate);
  
    return ResponseEntity.created(ucBuilder.path("/api/relationshiptemplates/{id}").buildAndExpand(relationshiptemplate.getId()).toUri()).body(saved);
   
 }

@RequestMapping(value = "/api/relationshiptemplates/{id}", method = RequestMethod.PUT)
public ResponseEntity<?> updateRelationshipTemplate(@PathVariable("id") long id, @RequestBody RelationshipTemplate relationshiptemplate) {

	RelationshipTemplate currentNodeTemplate = relationshipTemplateService.findById(id);

    if (currentNodeTemplate == null) {
    	throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to update. Repository with id " + id + " not found.");          
    }

    currentNodeTemplate = relationshiptemplate;

    relationshipTemplateService.update(relationshiptemplate);
    return ResponseEntity.ok().body(currentNodeTemplate);
}


@RequestMapping(value = "/api/relationshiptemplates/{id}", method = RequestMethod.DELETE)
public ResponseEntity<Void> deleteRelationshipTemplate(@PathVariable("id") Long id) {

	RelationshipTemplate nodeTemplate = relationshipTemplateService.findById(id);
		
		if (nodeTemplate == null) {
			throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to delete Repository. Repository with id " + id + " not found.");          	
    }
		
		relationshipTemplateService.delete(id);

    return ResponseEntity.noContent().build();
}


@RequestMapping(value = "/api/relationshiptemplates", method = RequestMethod.DELETE)
public ResponseEntity<Void> deleteAllRelationshipTemplates() {

	relationshipTemplateService.deleteAllRelationshipTemplates();
    return ResponseEntity.noContent().build();
}
	
	
	@ExceptionHandler(RepositoryNotFoundException.class)  
	 
	public String exceptionHandler(Exception e){  
		return e.getMessage();     	        
	}  

}
