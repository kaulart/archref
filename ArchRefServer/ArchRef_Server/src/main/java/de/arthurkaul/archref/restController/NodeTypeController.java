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

import de.arthurkaul.archref.exceptions.NodeTypeAlreadyExistException;
import de.arthurkaul.archref.exceptions.NodeTypeNotFoundException;
import de.arthurkaul.archref.model.NodeType;
import de.arthurkaul.archref.services.NodeTypeService;

@RestController
public class NodeTypeController {
	   
	@Autowired
	NodeTypeService nodeTypeService;
	

	@RequestMapping(value="/api/nodetype", method = RequestMethod.GET)
	public ResponseEntity<Collection<NodeType>> getAllNodeTypes() {
	
		Collection<NodeType> nodeTypes =  nodeTypeService.findAllNodeTypes();
		
		  if (nodeTypes.isEmpty()) {
			
			  throw new NodeTypeNotFoundException("NodeTypeNotFoundException: No NodeType found. No NodeType exist.");  
         
      }
       return ResponseEntity.ok().body(nodeTypes);
	}
	

	@RequestMapping(value="/api/nodetype/{id}", method = RequestMethod.GET)
	public ResponseEntity<NodeType> getNodeType(@PathVariable("id") long id) {

		NodeType nodeType = nodeTypeService.findById(id);
		
		  if (nodeType == null) {
			throw new NodeTypeNotFoundException("NodeTypeNotFoundException: Unable to find NodeType. NodeType with id " + id + " not found.");          	
      
      }
		return ResponseEntity.ok().body(nodeType);
	}
	
	
	@RequestMapping(value = "/api/nodetype", method = RequestMethod.POST)
   public ResponseEntity<NodeType> createNodeType(@RequestBody NodeType nodeType, UriComponentsBuilder ucBuilder) {
		
		if (nodeType.getId() != null) {
			throw new NodeTypeAlreadyExistException("NodeTypeAlreadyExistException: Unable to create NodeType. NodeType with id " + nodeType.getId() + " already exist.");          	
        }
		NodeType saved = nodeTypeService.create(nodeType);
		
		System.out.println("TEST");
       return ResponseEntity.created(ucBuilder.path("/api/nodetype/{id}").buildAndExpand(nodeType.getId()).toUri()).body(saved);
      
    }

   @RequestMapping(value = "/api/nodetype{id}", method = RequestMethod.PUT)
   public ResponseEntity<NodeType> updateNodeType(@PathVariable("id") long id, @RequestBody NodeType nodeType) {

	   NodeType currentNodeType = nodeTypeService.findById(id);

       if (currentNodeType == null) {
       	     throw new NodeTypeNotFoundException("NodeTypeNotFoundException: Unable to update NodeType. NodeType with id " + id + " not found.");          
       }

       currentNodeType.setName(nodeType.getName());

       nodeTypeService.update(currentNodeType);
       return ResponseEntity.ok().body(currentNodeType);
   }


   @RequestMapping(value = "/api/nodetype/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteNodeType(@PathVariable("id") Long id) {

	   NodeType nodeType = nodeTypeService.findById(id);
		
		if (nodeType == null) {
			throw new NodeTypeNotFoundException("NodeTypeNotFoundException: Unable to delete NodeType. NodeType with id " + id + " not found.");          	
       }
		
		nodeTypeService.delete(id);

       return ResponseEntity.noContent().build();
   }

   @RequestMapping(value = "/nodetype/", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteAllNodeTypes() {

	   nodeTypeService.deleteAllNodeTypes();
       return ResponseEntity.noContent().build();
   }
	
	
	 @ExceptionHandler(NodeTypeNotFoundException.class)  
	 
	    public String exceptionHandler(Exception e){  
	
		 return e.getMessage();  
	       	        
	    }  
	
}
