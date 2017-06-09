package de.arthurkaul.archref.services.refinement;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.topology.TopologyTemplate;

public interface RefinementInterface {

    Collection<TopologyTemplate> oneStepRefinment();
    
    Collection<TopologyTemplate> refineTopologyEager(TopologyTemplate topologyTemplate, LevelGraph levelGraph);

    Collection<TopologyTemplate> refineTopologyLazzy(TopologyTemplate topologyTemplate, LevelGraph levelGraph);
	
}
