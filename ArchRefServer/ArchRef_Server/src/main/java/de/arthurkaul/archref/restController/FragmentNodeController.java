package de.arthurkaul.archref.restController;

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

import de.arthurkaul.archref.exceptions.LevelGraphAlreadyExistException;
import de.arthurkaul.archref.exceptions.LevelGraphNotFoundException;
import de.arthurkaul.archref.model.levelgraph.FragmentNode;
import de.arthurkaul.archref.services.levelgraph.FragmentNodeService;

@RestController
public class FragmentNodeController {

	@Autowired
	FragmentNodeService fragmentNodeService;

	@RequestMapping(value = "/api/fragmentnodes", method = RequestMethod.GET)
	public ResponseEntity<Collection<FragmentNode>> getAllFragmentNodes() {

		Collection<FragmentNode> fragmentNodes = fragmentNodeService.findAllFragmentNodes();

		if (fragmentNodes.isEmpty()) {
			
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}
		return ResponseEntity.ok().body(fragmentNodes);
	}

	@RequestMapping(value = "/api/fragmentnodes/{id}", method = RequestMethod.GET)
	public ResponseEntity<FragmentNode> getFragmentNode(@PathVariable("id") long id) {

		FragmentNode fragmentNode = fragmentNodeService.findById(id);

		if (fragmentNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}
		return ResponseEntity.ok().body(fragmentNode);
	}

	@RequestMapping(value = "/api/fragmentnodes", method = RequestMethod.POST)
	public ResponseEntity<FragmentNode> createFragmentNode(@RequestBody FragmentNode fragmentNode, UriComponentsBuilder ucBuilder) {
		
		if (fragmentNode.getId() != null) {
			throw new LevelGraphAlreadyExistException(
					"LevelGraphAlreadyExistException: Unable to create LevelGraph. LevelGraph with id " + fragmentNode.getId()
							+ " already exist.");
		}
		FragmentNode saved = fragmentNodeService.create(fragmentNode);

		return ResponseEntity.created(ucBuilder.path("/api/fragmentnodes/{id}").buildAndExpand(fragmentNode.getId()).toUri())
				.body(saved);

	}

	@RequestMapping(value = "/api/fragmentnodes{id}", method = RequestMethod.PUT)
	public ResponseEntity<FragmentNode> updateFragmentNode(@PathVariable("id") long id, @RequestBody FragmentNode fragmentNode) {

		FragmentNode currentFragmentNode = fragmentNodeService.findById(id);

		if (currentFragmentNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to update LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		fragmentNodeService.update(currentFragmentNode);
		return ResponseEntity.ok().body(currentFragmentNode);
	}

	@RequestMapping(value = "/api/fragmentnodes/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteFragmentNode(@PathVariable("id") Long id) {

		FragmentNode fragmentNode = fragmentNodeService.findById(id);

		if (fragmentNode == null) {
			throw new LevelGraphNotFoundException(
					"LevelGraphNotFoundException: Unable to delete LevelGraph. LevelGraph with id " + id
							+ " not found.");
		}

		fragmentNodeService.delete(id);

		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value = "api/fragmentnodes", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteAllLevels() {

		fragmentNodeService.deleteAllFragmentNodes();
		return ResponseEntity.noContent().build();
	}

	@ExceptionHandler(LevelGraphNotFoundException.class)

	public String exceptionHandler(Exception e) {

		return e.getMessage();

	}
}