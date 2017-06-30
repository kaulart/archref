package de.arthurkaul.archref.restcontroller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import de.arthurkaul.archref.exceptions.EntityNotFoundException;
import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.services.RepositoryService;
import de.arthurkaul.archref.services.levelgraph.LevelGraphService;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

@RestController
public class ImportXMLController {

	@Autowired
	LevelGraphService levelGraphService;

	@Autowired
	RepositoryService repositoryService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	@RequestMapping(value = "/api/import/levelgraph", method = RequestMethod.POST)
	public ResponseEntity<LevelGraph> importLevelGraph(@RequestParam("file") File file, RedirectAttributes redirectAttributes) throws JAXBException {

		JAXBContext jaxbContext = JAXBContext.newInstance(LevelGraph.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		LevelGraph levelGraph = (LevelGraph) jaxbUnmarshaller.unmarshal(file);

		if (levelGraph == null) {

			throw new EntityNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}

		levelGraphService.create(levelGraph);

		return ResponseEntity.ok().body(levelGraph);
	}

	@RequestMapping(value = "/api/import/repository", method = RequestMethod.POST)
	public ResponseEntity<Repository> importLevelRepository(@RequestParam("file") MultipartFile multipartFile, RedirectAttributes redirectAttributes) throws JAXBException, IOException {

		File file = convert(multipartFile);

		JAXBContext jaxbContext = JAXBContext.newInstance(Repository.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		Repository repository = (Repository) jaxbUnmarshaller.unmarshal(file);

		if (repository == null) {

			throw new EntityNotFoundException("LevelGraphNotFoundException: No LevelGraph found. No LevelGraph exist.");

		}

		repositoryService.create(repository);

		return ResponseEntity.ok().body(repository);
	}

	public File convert(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		convFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}

}
