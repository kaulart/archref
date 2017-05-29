package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

}
