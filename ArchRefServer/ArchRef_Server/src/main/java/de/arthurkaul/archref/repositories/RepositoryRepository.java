package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <RepositoryRepository> - Extends <JpaRepository> and passed the JPA Entity which should be managed. It supports basic methods to find, paginate, create, update and delete a JPA Entity.
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Repository
public interface RepositoryRepository extends JpaRepository<de.arthurkaul.archref.model.Repository, Long> {
}
