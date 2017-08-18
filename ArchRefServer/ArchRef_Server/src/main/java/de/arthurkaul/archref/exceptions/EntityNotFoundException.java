package de.arthurkaul.archref.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/*******************************************************************************************************************************************************************************************************
 * 
 * @class EntityNotFoundException - Exception if a Entity was not found in the database
 * 
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Id Not Found")
public class EntityNotFoundException extends RuntimeException {

	public EntityNotFoundException(String message) {
		super(message);
	}

	public EntityNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
