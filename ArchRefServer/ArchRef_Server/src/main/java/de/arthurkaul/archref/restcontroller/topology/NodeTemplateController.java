package de.arthurkaul.archref.restcontroller.topology;

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
import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.services.topology.NodeTemplateService;


@RestController
public class NodeTemplateController {
	
	   @Autowired
	    NodeTemplateService nodeTemplateService;
	

	@RequestMapping(value="/api/nodetemplates", method = RequestMethod.GET)
	public ResponseEntity<Collection<NodeTemplate>> getAllNodeTemplates() {
		
		Collection<NodeTemplate> nodeTemplates =  nodeTemplateService.findAllNodeTemplates();
		
		  if (nodeTemplates.isEmpty()) {
			  throw new EntityNotFoundException("RepositoryNotFoundException: No Repository found. No Repository exist.");  
        // You many decide to return HttpStatus.NOT_FOUND
     }
      return ResponseEntity.ok().body(nodeTemplates);
	}
	

	@RequestMapping(value="/api/nodetemplates/{id}", method = RequestMethod.GET)
	public ResponseEntity<NodeTemplate> getNodeTemplate(@PathVariable("id") long id) {

		NodeTemplate nodeTemplate = nodeTemplateService.findById(id);
		
		  if (nodeTemplate == null) {
			throw new EntityNotFoundException("RepositoryNotFoundException: Unable to find Repository. Repository with id " + id + " not found.");          	
     
     }
		return ResponseEntity.ok().body(nodeTemplate);
	}
	
	
	@RequestMapping(value = "/api/nodetemplates", method = RequestMethod.POST)
  public ResponseEntity<NodeTemplate> createNodeTemplate(@RequestBody NodeTemplate nodeTemplate, UriComponentsBuilder ucBuilder) {
		
		if (nodeTemplate.getId() != null) {
			throw new EntityAlreadyExistException("RepositoryAlreadyExistException: Unable to create Repository. Repository with id " + nodeTemplate.getId() + " already exist.");          	
      }
		
		NodeTemplate saved = nodeTemplateService.create(nodeTemplate);
    
      return ResponseEntity.created(ucBuilder.path("/api/nodeTemplates/{id}").buildAndExpand(nodeTemplate.getId()).toUri()).body(saved);
     
   }

  @RequestMapping(value = "/api/nodetemplates/{id}", method = RequestMethod.PUT)
  public ResponseEntity<?> updateNodeTemplate(@PathVariable("id") long id, @RequestBody NodeTemplate nodeTemplate) {

	  NodeTemplate currentNodeTemplate = nodeTemplateService.findById(id);

      if (currentNodeTemplate == null) {
      	throw new EntityNotFoundException("RepositoryNotFoundException: Unable to update. Repository with id " + id + " not found.");          
      }

      currentNodeTemplate = nodeTemplate;

      nodeTemplateService.update(currentNodeTemplate);
      return ResponseEntity.ok().body(currentNodeTemplate);
  }


  @RequestMapping(value = "/api/nodetemplates/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Void> deleteNodeTemplate(@PathVariable("id") Long id) {

	  NodeTemplate nodeTemplate = nodeTemplateService.findById(id);
		
		if (nodeTemplate == null) {
			throw new EntityNotFoundException("RepositoryNotFoundException: Unable to delete Repository. Repository with id " + id + " not found.");          	
      }
		
		nodeTemplateService.delete(id);

      return ResponseEntity.noContent().build();
  }


  @RequestMapping(value = "/nodetemplates/", method = RequestMethod.DELETE)
  public ResponseEntity<Void> deleteAllRepositories() {

	  nodeTemplateService.deleteAllNodeTemplates();
      return ResponseEntity.noContent().build();
  }
	
	
	@ExceptionHandler(EntityNotFoundException.class)  
	 
	public String exceptionHandler(Exception e){  
		return e.getMessage();     	        
	}  


}
