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
import de.arthurkaul.archref.model.topologyTemplate.TopologyTemplate;
import de.arthurkaul.archref.services.topologytemplate.TopologyTemplateService;


@RestController
public class TopologyTemplateController {
	
	   @Autowired
	    TopologyTemplateService topologyTemplateService;
	

	@RequestMapping(value="/api/topologytemplates", method = RequestMethod.GET)
	public ResponseEntity<Collection<TopologyTemplate>> getAllTopologyTemplates() {
		
		Collection<TopologyTemplate> topologyTemplates =  topologyTemplateService.findAllTopologyTemplate();
		
		  if (topologyTemplates.isEmpty()) {
			  throw new RepositoryNotFoundException("RepositoryNotFoundException: No Repository found. No Repository exist.");  
         // You many decide to return HttpStatus.NOT_FOUND
      }
       return ResponseEntity.ok().body(topologyTemplates);
	}
	

	@RequestMapping(value="/api/topologytemplates/{id}", method = RequestMethod.GET)
	public ResponseEntity<TopologyTemplate> getTopologyTemplate(@PathVariable("id") long id) {

		TopologyTemplate topologyTemplate = topologyTemplateService.findById(id);
		
		  if (topologyTemplate == null) {
			throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to find Repository. Repository with id " + id + " not found.");          	
      
      }
		return ResponseEntity.ok().body(topologyTemplate);
	}
	
	
	@RequestMapping(value = "/api/topologytemplates", method = RequestMethod.POST)
   public ResponseEntity<TopologyTemplate> createTopologyTemplate(@RequestBody TopologyTemplate topologyTemplate, UriComponentsBuilder ucBuilder) {
		
		if (topologyTemplate.getId() != null) {
			throw new RepositoryAlreadyExistException("RepositoryAlreadyExistException: Unable to create Repository. Repository with id " + topologyTemplate.getId() + " already exist.");          	
       }
		
		TopologyTemplate saved = topologyTemplateService.create(topologyTemplate);
     
       return ResponseEntity.created(ucBuilder.path("/api/topologytemplates/{id}").buildAndExpand(topologyTemplate.getId()).toUri()).body(saved);
      
    }

   @RequestMapping(value = "/api/topologytemplates/{id}", method = RequestMethod.PUT)
   public ResponseEntity<?> updateTopologyTemplate(@PathVariable("id") long id, @RequestBody TopologyTemplate topologyTemplate) {

	   TopologyTemplate currentTopologyTemplate = topologyTemplateService.findById(id);

       if (currentTopologyTemplate == null) {
       	throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to update. Repository with id " + id + " not found.");          
       }

       currentTopologyTemplate.setName(topologyTemplate.getName());

       topologyTemplateService.update(topologyTemplate);
       return ResponseEntity.ok().body(currentTopologyTemplate);
   }


   @RequestMapping(value = "/api/topologytemplates/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteTopologyTemplate(@PathVariable("id") Long id) {

	   TopologyTemplate topologyTemplate = topologyTemplateService.findById(id);
		
		if (topologyTemplate == null) {
			throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to delete Repository. Repository with id " + id + " not found.");          	
       }
		
		topologyTemplateService.delete(id);

       return ResponseEntity.noContent().build();
   }


   @RequestMapping(value = "/topologytemplates/", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteAllRepositories() {

	   topologyTemplateService.deleteAllTopologyTemplates();
       return ResponseEntity.noContent().build();
   }
	
	
	@ExceptionHandler(RepositoryNotFoundException.class)  
	 
	public String exceptionHandler(Exception e){  
		System.out.println("THROW ERROR HANDLER");
		return e.getMessage();     	        
	}  

}
