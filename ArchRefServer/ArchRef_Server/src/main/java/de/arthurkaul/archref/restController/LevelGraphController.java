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

import de.arthurkaul.archref.exceptions.LevelGraphAlreadyExistException;
import de.arthurkaul.archref.exceptions.LevelGraphNotFoundException;
import de.arthurkaul.archref.model.LevelGraph;
import de.arthurkaul.archref.services.LevelGraphService;

@RestController
public class LevelGraphController {
	
	@Autowired
	LevelGraphService levelGraphService;
	
	
	@RequestMapping(value="/api/levelgraph", method = RequestMethod.GET)
	public ResponseEntity<Collection<LevelGraph>> getAllLevelGraphs() {
		 System.out.println("CALL API");
		Collection<LevelGraph> levelGraphs =  levelGraphService.findAllLevelGraphs();
		
		  if (levelGraphs.isEmpty()) {
			  System.out.println("THorw LevelGraphNotFoundException");
			  throw new LevelGraphNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");  
         
      }
       return ResponseEntity.ok().body(levelGraphs);
	}
	

	@RequestMapping(value="/api/levelgraph/{id}", method = RequestMethod.GET)
	public ResponseEntity<LevelGraph> getLevelGraph(@PathVariable("id") long id) {

		LevelGraph levelGraph = levelGraphService.findById(id);
		
		  if (levelGraph == null) {
			throw new LevelGraphNotFoundException("LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");          	
      
      }
		return ResponseEntity.ok().body(levelGraph);
	}
	
	
	@RequestMapping(value = "/api/levelgraph", method = RequestMethod.POST)
   public ResponseEntity<LevelGraph> createLevelGraph(@RequestBody LevelGraph levelGraph, UriComponentsBuilder ucBuilder) {
		
		if (levelGraph.getId() != null) {
			throw new LevelGraphAlreadyExistException("LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + levelGraph.getId() + " already exist.");          	
        }
		LevelGraph saved = levelGraphService.create(levelGraph);
		
       return ResponseEntity.created(ucBuilder.path("/api/levelgraph/{id}").buildAndExpand(levelGraph.getId()).toUri()).body(saved);
      
    }

   @RequestMapping(value = "/api/levelgraph{id}", method = RequestMethod.PUT)
   public ResponseEntity<LevelGraph> updateLevelGraph(@PathVariable("id") long id, @RequestBody LevelGraph levelGraph) {

	   LevelGraph currentLevelGraph = levelGraphService.findById(id);

       if (currentLevelGraph == null) {
       	     throw new LevelGraphNotFoundException("LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id + " not found.");          
       }

       currentLevelGraph.setName(levelGraph.getName());

       levelGraphService.update(currentLevelGraph);
       return ResponseEntity.ok().body(currentLevelGraph);
   }


   @RequestMapping(value = "/api/levelgraph/{id}", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteLevelGraph(@PathVariable("id") Long id) {

	   LevelGraph levelGraph = levelGraphService.findById(id);
		
		if (levelGraph == null) {
			throw new LevelGraphNotFoundException("LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id + " not found.");          	
       }
		
		levelGraphService.delete(id);

       return ResponseEntity.noContent().build();
   }

   @RequestMapping(value = "api/levelgraph", method = RequestMethod.DELETE)
   public ResponseEntity<Void> deleteAllLevelGraphs() {

	   levelGraphService.deleteAllNodeTypes();
       return ResponseEntity.noContent().build();
   }
	
	
	 @ExceptionHandler(LevelGraphNotFoundException.class)  
	 
	    public String exceptionHandler(Exception e){  
	
		 return e.getMessage();  
	       	        
	    }  
	
	
}
