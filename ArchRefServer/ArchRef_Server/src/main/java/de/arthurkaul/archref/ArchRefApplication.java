package de.arthurkaul.archref;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import de.arthurkaul.archref.services.RepositoryService;
import de.arthurkaul.archref.services.StorageService;
import de.arthurkaul.archref.services.levelgraph.LevelGraphService;
import de.arthurkaul.archref.services.topology.TopologyTemplateService;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class - <ArchRefApplication> - Entry point for the back-end server application which is separated from the front-end application which is currently written in Angular 4, but because the are
 *        decoupled you may decide to write a new different web front-end application.
 * 
 *        It handles all request from the client side to create, retrieve, update and delete data from the database over rest interfaces for different objects. It used currently Hibernate Version
 *        5.0.12.Final which implements the JPA API to map the Java Objects to Relational Tables which are delivered through a H2 database.
 * 
 * @hint: After programming a first prototype of a architectural refinement tool it may be a better idea to use a graph store for handle the data because of the level graph concept which is
 *        implemented with ArchRef.
 * 
 * @version 0.0.1 - First release version as a prototype, it is not production ready
 *
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
@SpringBootApplication
public class ArchRefApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArchRefApplication.class, args);
	}

	@Autowired
	LevelGraphService levelGraphService;

	@Autowired
	RepositoryService repositoryService;

	@Autowired
	TopologyTemplateService topologyTemplateService;

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();

			// File file = new File("ArchRefDefinition.xml");
			//
			// JAXBContext jaxbContext = JAXBContext.newInstance(Definition.class);
			// Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			//
			// Definition definition = (Definition) jaxbUnmarshaller.unmarshal(file);
			//
			// if (definition == null) {
			// throw new EntityNotFoundException("NoDefinition Exception: No Definition created.");
			// }
			//
			// for (Repository repository : definition.getRepositories()) {
			// repositoryService.create(repository);
			// }
			//
			// for (LevelGraph levelGraph : definition.getLevelGraphs()) {
			// levelGraphService.create(levelGraph);
			// }
			//
			// for (TopologyTemplate topologyTemplate : definition.getTopologies()) {
			// topologyTemplateService.create(topologyTemplate);
			// }

		};
	}

}
