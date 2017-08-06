package de.arthurkaul.archref.services;

import java.util.Collection;

import de.arthurkaul.archref.model.Repository;;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - RepositoryInterface is the Interface for the RepositoryService
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface RepositoryInterface {

	Collection<Repository> findAllRepository();

	Repository findById(Long id);

	Repository create(Repository repository);

	Repository update(Repository repository);

	void delete(Long id);

	void deleteAllRepositories();

}
