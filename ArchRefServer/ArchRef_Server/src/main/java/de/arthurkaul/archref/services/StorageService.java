package de.arthurkaul.archref.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import de.arthurkaul.archref.exceptions.StorageException;
import de.arthurkaul.archref.exceptions.StorageFileNotFoundException;
import de.arthurkaul.archref.storage.StorageProperties;


@Service
public class StorageService implements StorageInterface{
	
	   private final Path rootLocation;

	    @Autowired
	    public StorageService() {
	        this.rootLocation = Paths.get("Icon");
	    }

	    @Override
	    public void store(MultipartFile file, long id, String type) {
	        try {
	            if (file.isEmpty()) {
	                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
	            }
	            Files.copy(file.getInputStream(), this.rootLocation.resolve(type + id + file.getOriginalFilename()));
	            System.out.println("File get In:" + file.getInputStream() + "Fillt rr:" +this.rootLocation.resolve(id +"/"+ file.getOriginalFilename()));
	        } catch (IOException e) {
	            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
	        }
	    }

	    @Override
	    public Stream<Path> loadAll() {
	        try {
	            return Files.walk(this.rootLocation, 1)
	                    .filter(path -> !path.equals(this.rootLocation))
	                    .map(path -> this.rootLocation.relativize(path));
	        } catch (IOException e) {
	            throw new StorageException("Failed to read stored files", e);
	        }

	    }

	    @Override
	    public Path load(String filename, long id, String type) {
	        return rootLocation.resolve(type + id + filename);
	    }

	    @Override
	    public Resource loadAsResource(String filename, long id, String type) {
	        try {
	            Path file = load(filename, id, type);
	            Resource resource = new UrlResource(file.toUri());
	            if(resource.exists() || resource.isReadable()) {
	                return resource;
	            }
	            else {
	                throw new StorageFileNotFoundException("Could not read file: " + filename);

	            }
	        } catch (MalformedURLException e) {
	            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
	        }
	    }

	    @Override
	    public void deleteAll() {
	        FileSystemUtils.deleteRecursively(rootLocation.toFile());
	    }

	    @Override
	    public void init() {
	        try {
	            Files.createDirectory(rootLocation);
	        } catch (IOException e) {
	            throw new StorageException("Could not initialize storage", e);
	        }
	    }

}
