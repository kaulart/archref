package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import de.arthurkaul.archref.model.levelgraph.LevelGraphRelation;


public interface LevelGraphRelationRepository extends JpaRepository<LevelGraphRelation, Long>{

}
