package de.arthurkaul.archref.services;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/***********************************************************************************************************************************************************************************************************
 * 
 * @Interface - StorageInterface is the Service for the FileStorage on the Server Data it implements the interface for the methods which have to be implemented by a storage service for storing files
 *            on the server
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public interface StorageInterface {

	void init();

	void store(MultipartFile file, long id, String type);

	Stream<Path> loadAll();

	Path load(String filename, long id, String type);

	Path loadXML(String filename);

	Resource loadAsResource(String filename, long id, String type);

	void deleteAll();

}
