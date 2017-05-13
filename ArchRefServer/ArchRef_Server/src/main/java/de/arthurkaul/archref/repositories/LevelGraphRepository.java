package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.levelgraph.LevelGraph;

public interface LevelGraphRepository extends JpaRepository<LevelGraph, Long> {

}
