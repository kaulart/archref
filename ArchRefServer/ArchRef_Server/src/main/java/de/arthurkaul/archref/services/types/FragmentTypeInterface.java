package de.arthurkaul.archref.services.types;

import java.util.Collection;

import de.arthurkaul.archref.model.types.FragmentType;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - FragmentTypeInterface - Interface for the FragmentType define all Methods which should be implemented by this interface.
 *  									Currently not needed.
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface FragmentTypeInterface {
	  Collection<FragmentType> findAllFragmentNodes();
	    
	  FragmentType findById(long id);

	  FragmentType create(FragmentType fragmentNode);

	  FragmentType update(FragmentType fragmentNode);

	    void delete(long id);
	    
	    void deleteAllFragmentNodes();
}
