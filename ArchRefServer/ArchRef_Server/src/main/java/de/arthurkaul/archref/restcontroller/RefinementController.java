package de.arthurkaul.archref.restcontroller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.topology.TopologyTemplate;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

@RestController
public class RefinementController {

	@Autowired
	TopologyTemplateService topologyTemplateService;

	@RequestMapping(value = "/api/refinement/refineTopologyTemplate/{id}/{steps}", method = RequestMethod.POST)
	public ResponseEntity<TopologyTemplate> refineTopologyTemplate(@PathVariable("id") long idTopologyTemplate,
			@PathVariable("steps") long steps, @RequestBody LevelGraph levelGraph) {
		TopologyTemplate topologyTemplate = topologyTemplateService.findById(idTopologyTemplate);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");
		}
		
		topologyTemplate = startRefinement(steps, levelGraph, topologyTemplate);
		
		topologyTemplateService.update(topologyTemplate);
		
		return ResponseEntity.ok().body(topologyTemplate);
	}
	
	private TopologyTemplate startRefinement(Long steps, LevelGraph levelGraph, TopologyTemplate topologyTemplate){
		
		System.out.println("Start Refinement");
		levelGraph.constructLevelGraphMatrix();
		// TODO
		
		return topologyTemplate;
	}

}	
