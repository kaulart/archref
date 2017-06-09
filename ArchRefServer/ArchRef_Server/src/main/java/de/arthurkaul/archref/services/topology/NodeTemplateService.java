package de.arthurkaul.archref.services.topology;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.topology.NodeTemplate;
import de.arthurkaul.archref.repositories.NodeTemplateRepository;

@Service	
public class NodeTemplateService implements NodeTemplateInterface{

	@Autowired
	NodeTemplateRepository nodeTemplateRepository;
	
	@Override
	public Collection<NodeTemplate> findAllNodeTemplates() {
		return nodeTemplateRepository.findAll();
	}

	@Override
	public NodeTemplate findById(long id) {
		
		return nodeTemplateRepository.findOne(id);
	}

	@Override
	public NodeTemplate create(NodeTemplate nodeTemplate) {

		if (nodeTemplate.getId() != null) {
			return null;
        }		
	
		return nodeTemplateRepository.save(nodeTemplate);
	}

	@Override
	public NodeTemplate update(NodeTemplate nodeTemplate) {
		NodeTemplate persistedNodeTemplate = nodeTemplateRepository.findOne(nodeTemplate.getId());

        if (persistedNodeTemplate == null) {
            return null;
        }
		return nodeTemplateRepository.save(nodeTemplate);
	}

	@Override
	public void delete(long id) {
		nodeTemplateRepository.delete(id);
		
	}

	@Override
	public void deleteAllNodeTemplates() {
		nodeTemplateRepository.deleteAll();
		
	}

}
