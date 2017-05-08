package de.arthurkaul.archref.exceptions;

public class NodeTypeNotFoundException extends RuntimeException {
	
	public  NodeTypeNotFoundException(String message){
		super(message);
	}
	
	public  NodeTypeNotFoundException(String message, Throwable cause){
		super(message, cause);
	}

}
