package de.arthurkaul.archref.services.topologytemplate;

import java.util.Collection;

import de.arthurkaul.archref.model.topologyTemplate.NodeTemplate;


public interface NodeTemplateInterface {
	
	Collection<NodeTemplate> findAllNodeTemplates();
    
	NodeTemplate findById(long id);

	NodeTemplate create(NodeTemplate nodeTemplate);

	NodeTemplate update(NodeTemplate nodeTemplate);

    void delete(long id);
    
    void deleteAllNodeTemplates();
}
