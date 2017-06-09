package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.types.FragmentType;


public interface FragmentNodeRepository extends JpaRepository<FragmentType, Long>{

}
