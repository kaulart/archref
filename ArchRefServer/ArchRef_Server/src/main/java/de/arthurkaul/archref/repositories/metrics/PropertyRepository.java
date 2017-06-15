package de.arthurkaul.archref.repositories.metrics;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.metrics.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

}
