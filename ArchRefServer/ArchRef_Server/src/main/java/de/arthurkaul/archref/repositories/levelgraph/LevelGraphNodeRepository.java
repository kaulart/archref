package de.arthurkaul.archref.repositories.levelgraph;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.levelgraph.LevelGraphNode;

public interface LevelGraphNodeRepository extends JpaRepository<LevelGraphNode, Long>{

}
