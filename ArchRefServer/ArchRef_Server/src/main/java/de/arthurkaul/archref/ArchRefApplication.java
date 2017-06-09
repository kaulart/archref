package de.arthurkaul.archref;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import de.arthurkaul.archref.services.StorageService;

@SpringBootApplication
public class ArchRefApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArchRefApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
            storageService.deleteAll();
            storageService.init();
		};
	}

}
