import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.arthurkaul.archref.model.Repository;
import de.arthurkaul.archref.repositories.RepositoryRepository;
import de.arthurkaul.archref.services.RepositoryService;

@Component
public class Analyzer {

    @Autowired
    RepositoryRepository personRepository;

    @Autowired
    RepositoryService personService;

    @Autowired
    public Analyzer(RepositoryRepository repository, RepositoryService service) {
        this.personRepository = repository;
        this.personService = service;

        if (personRepository != null) {
            System.out.println("Number of Persons in DB:" + personRepository.findAll().size());

            // Insert new Person into the Database
            Repository person = new Repository();
            person.setName("Lisa Simpson");

            Repository newPerson = personService.create(person);


            if (newPerson != null) {

                System.out.println("Number of Persons in DB:" + personRepository.findAll().size());


            }


        }
    }

}
