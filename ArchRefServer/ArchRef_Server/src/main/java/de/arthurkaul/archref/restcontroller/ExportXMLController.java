package de.arthurkaul.archref.restcontroller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
 * @class - <ExportXMLController> - Controller for handling the XML export requests from the client
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@Controller
@RequestMapping("/api/export/xml")
public class ExportXMLController {

	@Autowired
	LevelGraphService levelGraphService;

	@Autowired
	RepositoryService repositoryService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exportLevelGraph - Export a XML file of the <LevelGraph> data
	 * 
	 * @param Long id - ID of the <LevelGraph> which should be exported
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/levelgraph/{id}", method = RequestMethod.GET)
	public void exportLevelGraph(@PathVariable("id") long id, HttpServletRequest request, HttpServletResponse response) throws JAXBException, IOException {

		LevelGraph levelGraph = levelGraphService.findById(id);
		if (levelGraph == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");

		}

		File file = new File("levelgraph.xml");
		JAXBContext jc = JAXBContext.newInstance(LevelGraph.class);
		Marshaller marshaller = jc.createMarshaller();

		marshaller.marshal(levelGraph, file);

		FileInputStream inputStream = new FileInputStream(file);
		OutputStream outStream = response.getOutputStream();

		response.setContentType("application/xml");
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"%s\"" + file.getName() + "\"");

		FileCopyUtils.copy(inputStream, outStream);
	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exportRepository - Export a XML file of the <Repository> data
	 * 
	 * @param Long id - ID of the <Repository>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/
	@RequestMapping(value = "/repository/{id}", method = RequestMethod.GET)
	public void exportRepository(@PathVariable("id") Long id, HttpServletRequest request, HttpServletResponse response) throws JAXBException, IOException {

		Repository repository = repositoryService.findById(id);
		if (repository == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");
		}

		File file = new File("repository.xml");

		JAXBContext jc = JAXBContext.newInstance(Repository.class);
		Marshaller marshaller = jc.createMarshaller();

		marshaller.marshal(repository, file);

		FileInputStream inputStream = new FileInputStream(file);
		OutputStream outStream = response.getOutputStream();

		response.setContentType("application/xml");
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"%s\"" + file.getName() + "\"");

		FileCopyUtils.copy(inputStream, outStream);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exportTopologyTemplate - Export a XML file of the <TopologyTemplate> data
	 * 
	 * @param Long id - ID of the <TopologyTemplate>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/

	@RequestMapping(value = "/topologytemplate/{id}", method = RequestMethod.GET)
	public void exportTopologyTemplate(@PathVariable("id") long id, HttpServletRequest request, HttpServletResponse response) throws JAXBException, IOException {

		TopologyTemplate topologyTemplate = topologyTemplateService.findById(id);
		if (topologyTemplate == null) {
			throw new EntityNotFoundException("LevelGraphNotFoundException: Unable to find LevelGraph. LevelGraph with id " + id + " not found.");
		}

		File file = new File("topology.xml");

		JAXBContext jc = JAXBContext.newInstance(TopologyTemplate.class);
		Marshaller marshaller = jc.createMarshaller();

		marshaller.marshal(topologyTemplate, file);

		FileInputStream inputStream = new FileInputStream(file);
		OutputStream outStream = response.getOutputStream();

		response.setContentType("application/xml");
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"%s\"" + file.getName() + "\"");

		FileCopyUtils.copy(inputStream, outStream);

	}

	/*******************************************************************************************************************************************************************************************************
	 * 
	 * @method - exportDefinition - Export a XML file of the <Definition> data
	 * 
	 * @param Long id - ID of the <Definition>
	 * @return
	 * @throws JAXBException
	 * @throws IOException
	 ******************************************************************************************************************************************************************************************************/

	@RequestMapping(value = "/definition", method = RequestMethod.GET)
	public void exportDefinition(HttpServletRequest request, HttpServletResponse response) throws JAXBException, IOException {

		Collection<TopologyTemplate> topologyTemplate = topologyTemplateService.findAllTopologyTemplate();
		Collection<Repository> repository = repositoryService.findAllRepository();
		Collection<LevelGraph> levelGraph = levelGraphService.findAllLevelGraphs();
		Definition definition = new Definition();
		if (repository != null) {
			definition.getRepositories().addAll(repository);
		}
		if (topologyTemplate != null) {
			definition.getTopologies().addAll(topologyTemplate);
		}
		if (levelGraph != null) {
			definition.getLevelGraphs().addAll(levelGraph);
		}

		File file = new File("definition.xml");

		JAXBContext jc = JAXBContext.newInstance(Definition.class);
		Marshaller marshaller = jc.createMarshaller();

		marshaller.marshal(definition, file);
		marshaller.marshal(definition, System.out);

		FileInputStream inputStream = new FileInputStream(file);
		OutputStream outStream = response.getOutputStream();

		response.setContentType("application/xml");
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"%s\"" + file.getName() + "\"");

		FileCopyUtils.copy(inputStream, outStream);

	}

}
