package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import de.arthurkaul.archref.model.types.FragmentType;

public interface FragmentNodeInterface {
	  Collection<FragmentType> findAllFragmentNodes();
	    
	  FragmentType findById(long id);

	  FragmentType create(FragmentType fragmentNode);

	  FragmentType update(FragmentType fragmentNode);

	    void delete(long id);
	    
	    void deleteAllFragmentNodes();
}
