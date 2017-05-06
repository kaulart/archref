package de.arthurkaul.archref.restController;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import de.arthurkaul.archref.Repository;
import de.arthurkaul.archref.exceptions.RepositoryAlreadyExistException;
import de.arthurkaul.archref.exceptions.RepositoryNotFoundException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdministrationController {

	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value="/api/repositories", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<Repository>> getAllRepositories() {
		System.out.println("GET ALL REPOSITORIES");
		
		ArrayList<Repository> repositories =  loadRepositoriesList();
		
		  if (repositories.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
          // You many decide to return HttpStatus.NOT_FOUND
       }
        return new ResponseEntity<ArrayList<Repository>>(repositories, HttpStatus.OK);
	}
	
	
	/**
	 * 
	 * @param user
	 * @param ucBuilder
	 * @return
	 */
	@RequestMapping(value = "/api/repositories", method = RequestMethod.POST)
    public ResponseEntity<Repository> createRepository(@RequestBody Repository repository, UriComponentsBuilder ucBuilder) {
       
		if (isRepositoryExist(repository)) {
			throw new RepositoryAlreadyExistException("RepositoryAlreadyExistException: Unable to create Repository. Repository with name: "+ repository.getName() + "already exist.");  
        }
		
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/repositories/{name}").buildAndExpand(repository.getName()).toUri());
      
        return ResponseEntity.created(headers.getLocation()).body(repository);
       
     }
 


//    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
//    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
//        logger.info("Updating User with id {}", id);
// 
//        User currentUser = userService.findById(id);
// 
//        if (currentUser == null) {
//            logger.error("Unable to update. User with id {} not found.", id);
//            return new ResponseEntity(new CustomErrorType("Unable to upate. User with id " + id + " not found."),
//                    HttpStatus.NOT_FOUND);
//        }
// 
//        currentUser.setName(user.getName());
//        currentUser.setAge(user.getAge());
//        currentUser.setSalary(user.getSalary());
// 
//        userService.updateUser(currentUser);
//        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
//    }
// 
    // ------------------- Delete a User-----------------------------------------
 
    @RequestMapping(value = "/api/repositories/{name}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteUser(@PathVariable("name") String name) {

    	File file = new File("/resources/static/repositories/" + name);
      
        if (!file.isDirectory()) {
 
        	throw new RepositoryNotFoundException("RepositoryNotFoundException: Unable to delete Repository. Repository with name"+ name + "not found.");  
            
        }
        file.delete();

        return ResponseEntity.noContent().build();
    }
 
//    // ------------------- Delete All Users-----------------------------
// 
//    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
//    public ResponseEntity<User> deleteAllUsers() {
//        logger.info("Deleting All Users");
// 
//        userService.deleteAllUsers();
//        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
//    }
	
	public ArrayList<Repository> loadRepositoriesList(){

		File file = new File("/resources/static/repositories");
		String[] directories = file.list(new FilenameFilter() {
		  @Override
		  public boolean accept(File current, String name) {
		    return new File(current, name).isDirectory();
		  }
		});

		ArrayList<Repository> repositories = new ArrayList<Repository>();	
		for(String repositoryName : directories){
			Repository tempRepository = new Repository(repositoryName);
			repositories.add(tempRepository);
		}
	
		return repositories;
	}
	
//	public Repository loadRepository(){
//		Repository repo = new Repository("Test");
//		File file = new File("/ArchRef_Server/src/main/resources/static/repositories/ets");
//		String[] fileArray = file.list();
//		for(String hallo : fileArray){
//			System.out.println("hallo");
//		}
//		return repo;
//	}
	
	public boolean isRepositoryExist(Repository repository){
		
		File file = new File("/resources/static/repositories/" + repository.getName());
		System.out.println(file.getPath());
		if(   file.mkdirs() == true){
				System.out.println("Directory Created");
				return false;
		}else{
			System.out.println("Directory Exist, no Creation");
			return true;
		}
		
	}
	
	/**
//	 * 
//	 * 
//	 * @return
//	 */
//	@RequestMapping(value="/api/repositories/{id}", method = RequestMethod.GET)
//	public ResponseEntity<Repository> getRepository() {
//		System.out.println("GET REPOSITORY");
//		
//		Repository repositories =  loadRepository();
//		
//		  if (repositories == null) {
//				System.out.println("Test2");
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
//          // You many decide to return HttpStatus.NOT_FOUND
//       }
//		return new ResponseEntity<Repository>(repositories, HttpStatus.OK);
//	}
	
	 @ExceptionHandler(RepositoryNotFoundException.class)  
	    public String exceptionHandler(Exception e){  
	        return e.getMessage();  
	       	        
	    }  
	
	
}

