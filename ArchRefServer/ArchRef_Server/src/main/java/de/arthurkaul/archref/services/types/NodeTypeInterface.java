package de.arthurkaul.archref.services.types;

import java.util.Collection;

import de.arthurkaul.archref.model.types.NodeType;;

/********************************************************************************************************************************************************************************************************
 * 
 * @interface - NodeTypeInterface - Interface for the NodeTypes define all Methods which should be implemented by this interface.
 * 
 * @author - Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
public interface NodeTypeInterface {

	Collection<NodeType> findAllNodeTypes();

	NodeType findById(long id);

	NodeType create(NodeType nodeType);

	NodeType update(NodeType nodeType);

	void delete(long id);

	void deleteAllNodeTypes();

}
