package de.arthurkaul.archref.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;
import de.arthurkaul.archref.model.topology.TopologyTemplate;

@XmlRootElement(name = "Definition", namespace = "archRef")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tDefinition")
/*******************************************************************************************************************************************************************************************************
 *
 * @class - <Definition> - Used for export and import a combination of Level Graphs, Topologies and Repositories
 *
 * @field - List<Repository> repositories - List of Repositories
 * @field - List<LevelGraph> levelGraphs - List of LevelGraphs
 * @field - List<TopologyTemplate> topologies - List of TopologyTemplates
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
public class Definition {

	@XmlElementWrapper(name = "Repositories")
	@XmlElement(name = "Repository")
	private List<Repository> repositories = new ArrayList<Repository>();

	@XmlElementWrapper(name = "LevelGraphs")
	@XmlElement(name = "LevelGraph")
	private List<LevelGraph> levelGraphs = new ArrayList<LevelGraph>();

	@XmlElementWrapper(name = "Topologies")
	@XmlElement(name = "Topology")
	private List<TopologyTemplate> topologies = new ArrayList<TopologyTemplate>();

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter Getter and Setter for the fields
	 * 
	 ***************************************************************************************************************************************************************************************************/
	public List<Repository> getRepositories() {
		return repositories;
	}

	public void setRepositories(List<Repository> repositories) {
		this.repositories = repositories;
	}

	public List<LevelGraph> getLevelGraphs() {
		return levelGraphs;
	}

	public void setLevelGraphs(List<LevelGraph> levelGraphs) {
		this.levelGraphs = levelGraphs;
	}

	public List<TopologyTemplate> getTopologies() {
		return topologies;
	}

	public void setTopologies(List<TopologyTemplate> topologies) {
		this.topologies = topologies;
	}

}
