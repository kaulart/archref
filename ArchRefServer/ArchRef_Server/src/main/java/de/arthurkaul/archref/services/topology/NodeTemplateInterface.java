package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import de.arthurkaul.archref.model.topology.NodeTemplate;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - NodeTemplateInterface - Interface for the NodeTemplate define all Methods which should be implemented by this interface.
 * 
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface NodeTemplateInterface {

	Collection<NodeTemplate> findAllNodeTemplates();

	NodeTemplate findById(long id);

	NodeTemplate create(NodeTemplate nodeTemplate);

	NodeTemplate update(NodeTemplate nodeTemplate);

	void delete(long id);

	void deleteAllNodeTemplates();
}
