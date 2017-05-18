package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.levelgraph.FragmentNode;

public interface FragmentNodeInterface {
	  Collection<FragmentNode> findAllFragmentNodes();
	    
	  FragmentNode findById(long id);

	  FragmentNode create(FragmentNode fragmentNode);

	  FragmentNode update(FragmentNode fragmentNode);

	    void delete(long id);
	    
	    void deleteAllFragmentNodes();
}
