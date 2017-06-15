package de.arthurkaul.archref.services.types;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.repositories.types.NodeTypeRepository;


@Service
public class NodeTypeService implements NodeTypeInterface {

	@Autowired
	NodeTypeRepository nodeTypeRepository;
	
	@Override
	public Collection<NodeType> findAllNodeTypes() {
		
		return nodeTypeRepository.findAll();
		
	}

	@Override
	public NodeType findById(long id) {
		
		return nodeTypeRepository.findOne(id);
		
	}

	@Override
	public NodeType create(NodeType nodeType) {
		
		if (nodeType.getId() != null) {
			return null;
        }
		
		return nodeTypeRepository.save(nodeType);
	}

	@Override
	public NodeType update(NodeType nodeType) {
		
		NodeType persistedNodeType = nodeTypeRepository.findOne(nodeType.getId());
        
		if (persistedNodeType == null) {
            return null;
        }
		
		return nodeTypeRepository.save(nodeType);
	}

	@Override
	public void delete(long id) {
		
		nodeTypeRepository.delete(id);	
		
	}

	@Override
	public void deleteAllNodeTypes() {
		
		nodeTypeRepository.deleteAll();
		
	}

}
