package de.arthurkaul.archref.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.repositories.RepositoryRepository;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Service - RepositoryService is the Service for the Repository Data it implements CRUD methods which create, update, retrieve and delete data from and in the database
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Service
public class RepositoryService implements RepositoryInterface {

	@Autowired
	RepositoryRepository repositoryRepository;

	@Override
	public Collection<Repository> findAllRepository() {

		return repositoryRepository.findAll();
	}

	@Override
	public Repository findById(Long id) {

		return repositoryRepository.findOne(id);
	}

	@Override
	public Repository create(Repository repository) {

		if (repository.getId() != null) {
			Repository persistedRepository = repositoryRepository.findOne(repository.getId());
			if (persistedRepository == null) {
				return repositoryRepository.save(repository);
			}
			return null;
		}

		return repositoryRepository.save(repository);
	}

	@Override
	public Repository update(Repository repository) {
		Repository persistedRepository = repositoryRepository.findOne(repository.getId());

		if (persistedRepository == null) {
			return null;
		}

		return repositoryRepository.save(repository);

	}

	@Override
	public void delete(Long id) {

		repositoryRepository.delete(id);
	}

	@Override
	public void deleteAllRepositories() {

		repositoryRepository.deleteAll();
	}

}
