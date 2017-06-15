package de.arthurkaul.archref.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import de.arthurkaul.archref.exceptions.StorageFileNotFoundException;
import de.arthurkaul.archref.services.StorageService;

@RestController
public class FileUploadController {

	  private final StorageService storageService;

	    @Autowired
	    public FileUploadController(StorageService storageService) {
	        this.storageService = storageService;
	    }

//	    @GetMapping("/")
//	    public String listUploadedFiles(Model model) throws IOException {
//
//	        model.addAttribute("files", storageService
//	                .loadAll()
//	                .map(path ->
//	                        MvcUriComponentsBuilder
//	                                .fromMethodName(FileUploadController.class, "serveFile", path.getFileName().toString())
//	                                .build().toString())
//	                .collect(Collectors.toList()));
//
//	        return "uploadForm";
//	    }
//
	    @GetMapping("/api/fileupload/{type}/{id}/{filename:.+}")
	    @ResponseBody
	    public ResponseEntity<Resource> serveFile(@PathVariable String filename, @PathVariable long id, @PathVariable String type) {

	     Resource file = storageService.loadAsResource(filename, id, type);
	        return ResponseEntity
	                .ok()
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")
	                .body(file);
	    }

	    @PostMapping("/api/fileupload/{type}/{id}")
	    public String handleFileUpload(@RequestParam("file") MultipartFile file,
	                                   RedirectAttributes redirectAttributes, @PathVariable("id") long id, @PathVariable("type") String type) {
	    	System.out.println("Fileupload: " +  file.getContentType());
	        storageService.store(file, id, type);
	        redirectAttributes.addFlashAttribute("message",
	                "You successfully uploaded " + file.getOriginalFilename() + "!");
	    	
	        return file.getOriginalFilename() ;
	    }

	    @ExceptionHandler(StorageFileNotFoundException.class)
	    public ResponseEntity handleStorageFileNotFound(StorageFileNotFoundException exc) {
	        return ResponseEntity.notFound().build();
	    }

	
}
