package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.levelgraph.FragmentNode;


public interface FragmentNodeRepository extends JpaRepository<FragmentNode, Long>{

}
