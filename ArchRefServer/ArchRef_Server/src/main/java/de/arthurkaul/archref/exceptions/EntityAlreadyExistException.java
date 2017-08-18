package de.arthurkaul.archref.exceptions;

/*******************************************************************************************************************************************************************************************************
 * 
 * @class EntityAlreadyExistException - Exception if a entity already exist in the database
 * 
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

public class EntityAlreadyExistException extends RuntimeException {

	private static final long serialVersionUID = 6475307190053991394L;

	public EntityAlreadyExistException(String message) {
		super(message);
	}

	public EntityAlreadyExistException(String message, Throwable cause) {
		super(message);
	}

}
