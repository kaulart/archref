package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import de.arthurkaul.archref.model.topology.TopologyTemplate;


public interface TopologyTemplateInterface {
	
	 Collection<TopologyTemplate> findAllTopologyTemplate();
	    
	 TopologyTemplate findById(long id);

	 TopologyTemplate create(TopologyTemplate topologyTemplate);

	 TopologyTemplate update(TopologyTemplate topologyTemplate);

	 void delete(long id);
	    
	 void deleteAllTopologyTemplates();

}
