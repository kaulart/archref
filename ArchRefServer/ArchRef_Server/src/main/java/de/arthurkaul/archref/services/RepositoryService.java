package de.arthurkaul.archref.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.repositories.RepositoryRepository;

@Service
public class RepositoryService implements RepositoryInterface {

	@Autowired
	RepositoryRepository repositoryRepository;

	@Override
	public Collection<Repository> findAllRepository() {

		return repositoryRepository.findAll();
	}

	@Override
	public Repository findById(long id) {

		return repositoryRepository.findOne(id);
	}

	@Override
	public Repository create(Repository repository) {

		if (repository.getId() != null) {
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
	public void delete(long id) {

		repositoryRepository.delete(id);
	}

	@Override
	public void deleteAllRepositories() {

		repositoryRepository.deleteAll();
	}

}
