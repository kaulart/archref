package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import de.arthurkaul.archref.model.topology.TopologyTemplate;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - TopologyTemplateInterface - Interface for the TopologyTemplates define all Methods which should be implemented by this interface.
 *  								
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface TopologyTemplateInterface {
	
	 Collection<TopologyTemplate> findAllTopologyTemplate();
	    
	 TopologyTemplate findById(long id);

	 TopologyTemplate create(TopologyTemplate topologyTemplate);

	 TopologyTemplate update(TopologyTemplate topologyTemplate);

	 void delete(long id);
	    
	 void deleteAllTopologyTemplates();

}
