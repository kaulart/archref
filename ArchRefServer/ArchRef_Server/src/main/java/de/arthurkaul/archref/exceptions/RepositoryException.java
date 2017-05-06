package de.arthurkaul.archref.exceptions;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import org.springframework.util.MultiValueMap;

public class RepositoryException extends RuntimeException {
	
	public  RepositoryException(String message){
		super(message);
	}
	
	public  RepositoryException(String message, Throwable cause){
		super(message, cause);
	}

}

