package de.arthurkaul.archref.services;

import org.springframework.core.io.Resource;
import java.nio.file.Path;
import java.util.stream.Stream;	
import org.springframework.web.multipart.MultipartFile;

public interface StorageInterface {

	void init();

	void store(MultipartFile file, long id, String type);

	Stream<Path> loadAll();

	Path load(String filename, long id, String type);

	Resource loadAsResource(String filename, long id, String type);

	void deleteAll();

}
