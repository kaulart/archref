package de.arthurkaul.archref.exceptions;

public class NodeTypeException extends RuntimeException {
	
	public  NodeTypeException(String message){
		super(message);
	}
	
	public  NodeTypeException(String message, Throwable cause){
		super(message, cause);
	}

}
