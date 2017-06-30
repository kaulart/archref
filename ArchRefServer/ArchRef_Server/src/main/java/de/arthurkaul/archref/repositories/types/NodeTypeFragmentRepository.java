package de.arthurkaul.archref.repositories.types;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.types.NodeTypeFragment;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <NodeTypeFragmentRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA
 *        Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface NodeTypeFragmentRepository extends JpaRepository<NodeTypeFragment, Long> {

}
