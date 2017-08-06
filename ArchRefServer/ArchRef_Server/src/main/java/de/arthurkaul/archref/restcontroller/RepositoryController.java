package de.arthurkaul.archref.restcontroller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import de.arthurkaul.archref.exceptions.EntityAlreadyExistException;
import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.services.RepositoryService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class RepositoryController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the repository data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/repositories")
public class RepositoryController {

	@Autowired
	RepositoryService repositoryService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllRepositories - Call the Repository Service and retrieve all available Repositories and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<Repository>> - Response with a collection of all available Repositories in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<Repository>> getAllRepositories() {

		Collection<Repository> repositories = repositoryService.findAllRepository();

		if (repositories.isEmpty()) {
			throw new EntityNotFoundException("RepositoryNotFoundException: No Repository found. No Repository exist.");
		}

		return ResponseEntity.ok().body(repositories);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getRepository - Call the Repository Service and look for a Repository with a certain id. If a repository with this id exist in the database then retrieve it and send it back to the
	 *         client in a response
	 * 
	 * @return ResponseEntity<Repository> - Response with only one Repository in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Repository> getRepository(@PathVariable("id") Long id) {

		Repository repository = repositoryService.findById(id);

		if (repository == null) {
			throw new EntityNotFoundException("RepositoryNotFoundException: Unable to find Repository. Repository with id " + id + " not found.");
		}

		return ResponseEntity.ok().body(repository);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createRepository - Create a new Repository in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<Repository> - Return the created repository with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Repository> createRepository(@RequestBody Repository repository, UriComponentsBuilder ucBuilder) {

		if (repository.getId() != null) {
			throw new EntityAlreadyExistException("RepositoryAlreadyExistException: Unable to create Repository. Repository with id " + repository.getId() + " already exist.");
		}

		Repository saved = repositoryService.create(repository);

		return ResponseEntity.created(ucBuilder.path("/api/repositories/{id}").buildAndExpand(repository.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateRepository - Update a Repository if it exist in the database
	 * 
	 * @return ResponseEntity<Repository> - Return the updated repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateRepository(@PathVariable("id") Long id, @RequestBody Repository repository) {

		Repository currentRepository = repositoryService.findById(id);

		if (currentRepository == null) {
			throw new EntityNotFoundException("RepositoryNotFoundException: Unable to update. Repository with id " + id + " not found.");
		}

		currentRepository.setName(repository.getName());

		repositoryService.update(repository);
		return ResponseEntity.ok().body(currentRepository);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteRepository - Delete a Repository if it exist in the database
	 * 
	 * @return ResponseEntity<Repository> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteRepository(@PathVariable("id") Long id) {

		Repository repository = repositoryService.findById(id);

		if (repository == null) {
			throw new EntityNotFoundException("RepositoryNotFoundException: Unable to delete Repository. Repository with id " + id + " not found.");
		}

		repositoryService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllRepositories - Delete all available repositories in the database
	 * 
	 * @return ResponseEntity<Void> - return no Repository
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllRepositories() {

		repositoryService.deleteAllRepositories();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the Repository RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
