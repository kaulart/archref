package de.arthurkaul.archref.repositories.levelgraph;

import org.springframework.data.jpa.repository.JpaRepository;
import de.arthurkaul.archref.model.levelgraph.Level;

public interface LevelRepository  extends JpaRepository<Level, Long>{

}
