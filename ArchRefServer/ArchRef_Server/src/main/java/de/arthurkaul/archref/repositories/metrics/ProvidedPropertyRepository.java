package de.arthurkaul.archref.repositories.metrics;

import org.springframework.data.jpa.repository.JpaRepository;

import de.arthurkaul.archref.model.metrics.ProvidedProperty;

public interface ProvidedPropertyRepository extends JpaRepository<ProvidedProperty, Long>{

}
