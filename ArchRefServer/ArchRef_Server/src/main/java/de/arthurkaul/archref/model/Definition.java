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
import de.arthurkaul.archref.model.types.NodeType;
import de.arthurkaul.archref.model.types.RelationshipType;

@XmlRootElement(name = "Definition")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tDefinition")
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

	@XmlElementWrapper(name = "NodeTypes")
	@XmlElement(name = "NodeType")
	private List<NodeType> nodeTypes = new ArrayList<NodeType>();

	@XmlElementWrapper(name = "RelationshipTypes")
	@XmlElement(name = "RelationshipType")
	private List<RelationshipType> relationshipTypes = new ArrayList<RelationshipType>();

}
