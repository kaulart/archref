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
import de.arthurkaul.archref.model.Definition;
import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.topology.TopologyTemplate;
import de.arthurkaul.archref.services.RepositoryService;
import de.arthurkaul.archref.services.levelgraph.LevelGraphService;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <ImportXMLController> - Controller for handling the XML import requests from the client
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@RestController
@RequestMapping("/api/import")
public class ImportXMLController {

	@Autowired
	LevelGraphService levelGraphService;

	@Autowired
	RepositoryService repositoryService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - importLevelGraph - Import a XML file of the a <LevelGraph>
	 * 
	 * @param Long id - ID of the <LevelGraph> which should be exported
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/levelgraph", method = RequestMethod.POST)
	public ResponseEntity<LevelGraph> importLevelGraph(@RequestParam("file") MultipartFile multipartFile, RedirectAttributes redirectAttributes) throws JAXBException, IOException {

		File file = convert(multipartFile);

		JAXBContext jaxbContext = JAXBContext.newInstance(LevelGraph.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		LevelGraph levelGraph = (LevelGraph) jaxbUnmarshaller.unmarshal(file);

		if (levelGraph == null) {

			throw new EntityNotFoundException("NoLevelGraphCreated Exception: No LevelGraph created.");

		}
		levelGraph = levelGraphService.create(levelGraph);
		levelGraph.updatePosition();
		levelGraphService.update(levelGraph);

		return ResponseEntity.ok().body(levelGraph);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - importRepository - Import a XML file of the <Repository> data
	 * 
	 * @param Long id - ID of the <Repository>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/repository", method = RequestMethod.POST)
	public ResponseEntity<Repository> importRepository(@RequestParam("file") MultipartFile multipartFile, RedirectAttributes redirectAttributes) throws JAXBException, IOException {

		File file = convert(multipartFile);

		JAXBContext jaxbContext = JAXBContext.newInstance(Repository.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		Repository repository = (Repository) jaxbUnmarshaller.unmarshal(file);

		if (repository == null) {

			throw new EntityNotFoundException("NoRepositoryCreated Exception: No Repository created.");

		}
		repository = repositoryService.create(repository);

		return ResponseEntity.ok().body(repository);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - importTopologyTemplate - Import a XML file of the <TopologyTemplate> data
	 * 
	 * @param Long id - ID of the <TopologyTemplate>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/topologytemplate", method = RequestMethod.POST)
	public ResponseEntity<TopologyTemplate> importTopologyTemplate(@RequestParam("file") MultipartFile multipartFile, RedirectAttributes redirectAttributes) throws JAXBException, IOException {

		File file = convert(multipartFile);

		JAXBContext jaxbContext = JAXBContext.newInstance(TopologyTemplate.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		TopologyTemplate topologyTemplate = (TopologyTemplate) jaxbUnmarshaller.unmarshal(file);

		if (topologyTemplate == null) {
			throw new EntityNotFoundException("NoTopologyTemplateCreated Exception: No TopologyTemplate created.");
		}

		topologyTemplate = topologyTemplateService.create(topologyTemplate);
		topologyTemplate.updatePosition();
		topologyTemplateService.update(topologyTemplate);

		return ResponseEntity.ok().body(topologyTemplate);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - importDefinition - Import a XML file of the <Definition> data
	 * 
	 * @param Long id - ID of the <Definition>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/definition", method = RequestMethod.POST)
	public ResponseEntity<Definition> importDefinition(@RequestParam("file") MultipartFile multipartFile, RedirectAttributes redirectAttributes) throws JAXBException, IOException {

		File file = convert(multipartFile);

		JAXBContext jaxbContext = JAXBContext.newInstance(Definition.class);
		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		Definition definition = (Definition) jaxbUnmarshaller.unmarshal(file);

		if (definition == null) {
			throw new EntityNotFoundException("NoDefinition Exception: No Definition created.");
		}

		for (Repository repository : definition.getRepositories()) {
			repositoryService.create(repository);
		}

		for (int i = 0; i < definition.getLevelGraphs().size(); i++) {
			LevelGraph levelGraph = levelGraphService.create(definition.getLevelGraphs().get(i));
			if (levelGraph != null) {
				levelGraph.updatePosition();
				levelGraph = levelGraphService.update(levelGraph);
				definition.getLevelGraphs().set(i, levelGraph);
			}
		}

		for (int i = 0; i < definition.getTopologies().size(); i++) {
			TopologyTemplate topologyTemplate = topologyTemplateService.create(definition.getTopologies().get(i));
			if (topologyTemplate != null) {
				topologyTemplate.updatePosition();
				topologyTemplate = topologyTemplateService.update(topologyTemplate);
				definition.getTopologies().set(i, topologyTemplate);

			}
		}

		return ResponseEntity.ok().body(definition);

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
