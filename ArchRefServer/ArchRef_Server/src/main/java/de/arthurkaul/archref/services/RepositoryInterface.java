package de.arthurkaul.archref.services;

import java.util.Collection;
import de.arthurkaul.archref.model.Repository;;

public interface RepositoryInterface {
	
    Collection<Repository> findAllRepository();
    
    Repository findById(long id);

    Repository create(Repository repository);

    Repository update(Repository repository);

    void delete(long id);
    
    void deleteAllRepositories();

}
