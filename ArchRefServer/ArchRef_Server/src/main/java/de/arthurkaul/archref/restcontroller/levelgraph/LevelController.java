package de.arthurkaul.archref.restcontroller.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import de.arthurkaul.archref.exceptions.EntityAlreadyExistException;
import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.levelgraph.Level;
import de.arthurkaul.archref.services.levelgraph.LevelService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class RepositoryController - is the RestController Interface of the server it handles all request from clients and implements the CRUD methods for the Level data
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/levels")
public class LevelController {

	@Autowired
	LevelService levelService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getAllLevels - Call the Level Service and retrieve all available Levels and send a response back to the client
	 * 
	 * @return ResponseEntity<Collection<Level>> - Response with a collection of all available Levels in the database
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<Level>> getAllLevels() {

		Collection<Level> levels = levelService.findAllLevels();

		if (levels.isEmpty()) {
			throw new EntityNotFoundException("LevelNotFoundException: No Level found. No Level exist.");

		}
		return ResponseEntity.ok().body(levels);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - getLevel - Call the Level Service and look for a Level with a certain id. If a Level with this id exist in the database then retrieve it and send it back to the client in a response
	 * 
	 * @return ResponseEntity<Level> - Response with only one Level in the body
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Level> getLevel(@PathVariable("id") long id) {

		Level level = levelService.findById(id);

		if (level == null) {
			throw new EntityNotFoundException("LevelNotFoundException: Unable to find Level. Level with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(level);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - createLevel - Create a new Level in the database with the data which was send in the request
	 * 
	 * @return ResponseEntity<Level> - Return the created Level with his new id
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Level> createLevel(@RequestBody Level level, UriComponentsBuilder ucBuilder) {

		if (level.getId() != null) {
			throw new EntityAlreadyExistException("LevelAlreadyExistException: Unable to create Level. Level with id " + level.getId() + " already exist.");
		}
		Level saved = levelService.create(level);

		return ResponseEntity.created(ucBuilder.path("/api/level/{id}").buildAndExpand(level.getId()).toUri()).body(saved);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - updateLevel - Update a Level if it exist in the database
	 * 
	 * @return ResponseEntity<Level> - Return the updated Level
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Level> updateLevel(@PathVariable("id") long id, @RequestBody Level level) {

		Level currentLevel = levelService.findById(id);

		if (currentLevel == null) {
			throw new EntityNotFoundException("LevelNotFoundException: Unable to update Level. Level with id " + id + " not found.");
		}

		currentLevel = level;

		levelService.update(currentLevel);
		return ResponseEntity.ok().body(currentLevel);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteLevel - Delete a Level if it exist in the database
	 * 
	 * @return ResponseEntity<Level> - return no Level
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteLevel(@PathVariable("id") Long id) {

		Level level = levelService.findById(id);

		if (level == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id + " not found.");
		}

		levelService.delete(id);

		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - deleteAllLevels - Delete all available Levels in the database
	 * 
	 * @return ResponseEntity<Void> - return no Level
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevels() {

		levelService.deleteAllLevels();
		return ResponseEntity.noContent().build();
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exceptionHandler - Handle the errors which are thrown in the Level RestController Scope
	 * 
	 * @return String - Error Message String
	 * 
	 ******************************************************************************************************************************************************************************************************/
	@ExceptionHandler({ EntityNotFoundException.class, EntityAlreadyExistException.class })
	public String exceptionHandler(Exception e) {
		return e.getMessage();
	}

}
