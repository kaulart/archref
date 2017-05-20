package de.arthurkaul.archref.services;

import java.util.Collection;

import de.arthurkaul.archref.model.topologyTemplate.NodeType;;

public interface NodeTypeInterface {
	
	    Collection<NodeType> findAllNodeTypes();
	    
	    NodeType findById(long id);

	    NodeType create(NodeType nodeType);

	    NodeType update(NodeType nodeType);

	    void delete(long id);
	    
	    void deleteAllNodeTypes();
	    
}
