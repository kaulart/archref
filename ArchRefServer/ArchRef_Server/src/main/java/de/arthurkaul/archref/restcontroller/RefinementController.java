package de.arthurkaul.archref.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.levelgraph.Level;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.topology.TopologyTemplate;
import de.arthurkaul.archref.services.RefinementService;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

@RestController
public class RefinementController {

	@Autowired
	TopologyTemplateService topologyTemplateService;

	@Autowired
	RefinementService refinementService;

	/******************************************************************************************************************************************
	 * 
	 * @method - refineTopologyTemplate - Refine a TopologyTemplate from the current abstraction level of the TopologyTemplate in the level graph to the lowest level of abstraction in the level graph
	 * 
	 * 
	 * @param long idTopologyTemplate - ID of TopologyTemplate which should be refined passed as path variable of the url of the request
	 * @param LevelGraph levelGraph - LevelGraph which should be used for refinement passed in the body
	 * 
	 * @return TopologyTemplate - The TopologyTemplate which was refined with all refined child TopologyTemplates
	 * 
	 *****************************************************************************************************************************************/
	@RequestMapping(value = "/api/refinement/refineTopologyTemplate/{id}/{smi}", method = RequestMethod.POST)
	public ResponseEntity<TopologyTemplate> refineTopologyTemplate(@PathVariable("id") long idTopologyTemplate, @PathVariable("smi") float smi, @RequestBody LevelGraph levelGraph) {

		TopologyTemplate topologyTemplate = topologyTemplateService.findById(idTopologyTemplate);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("No refinement could be processed because <TopologyTemplate> with id" + idTopologyTemplate + "was not found in the database.");
		}

		/*
		 * Determine the depth of the LevelGraph. ATTENTION the depth is in this case is not equal the number of different levels of the Graph because it is a merged LevelGraph
		 */
		for (Level level : levelGraph.getLevels()) {
			if (level.getDepth() > levelGraph.getDepth()) {
				levelGraph.setDepth(level.getDepth());
			}
		}

		topologyTemplate = refinementService.initializeRefinement(levelGraph, topologyTemplate, levelGraph.getDepth(), smi);

		topologyTemplate = topologyTemplateService.findById(topologyTemplate.getId());

		return ResponseEntity.ok().body(topologyTemplate);
	}

	/**
	 * 
	 * @method - refineOneStepTopologyTemplate -
	 * 
	 * @param idTopologyTemplate
	 * @param smi
	 * @param levelGraph
	 * @return
	 */
	@RequestMapping(value = "/api/refinement/refineOneStepTopologyTemplate/{id}/{smi}", method = RequestMethod.POST)
	public ResponseEntity<TopologyTemplate> refineOneStepTopologyTemplate(@PathVariable("id") long idTopologyTemplate, @PathVariable("smi") float smi, @RequestBody LevelGraph levelGraph) {
		TopologyTemplate topologyTemplate = topologyTemplateService.findById(idTopologyTemplate);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("No refinement could be processed because <TopologyTemplate> with id" + idTopologyTemplate + "was not found in the database.");
		}

		/*
		 * Determine the depth of the LevelGraph. ATTENTION the depth is in this case is not equal the number of different levels of the Graph because it is a merged LevelGraph
		 */
		for (Level level : levelGraph.getLevels()) {
			if (level.getDepth() > levelGraph.getDepth()) {
				levelGraph.setDepth(level.getDepth());
			}
		}

		topologyTemplate = refinementService.initializeRefinement(levelGraph, topologyTemplate, topologyTemplate.getAbstractionLevel() + 1, smi);

		topologyTemplateService.update(topologyTemplate);

		return ResponseEntity.ok().body(topologyTemplate);
	}

}
