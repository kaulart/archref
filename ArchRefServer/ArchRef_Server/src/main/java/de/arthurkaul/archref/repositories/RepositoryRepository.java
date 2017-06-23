package de.arthurkaul.archref.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryRepository extends JpaRepository<de.arthurkaul.archref.model.Repository, Long> {
}
