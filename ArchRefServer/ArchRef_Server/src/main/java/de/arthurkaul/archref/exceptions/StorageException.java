package de.arthurkaul.archref.exceptions;

/*******************************************************************************************************************************************************************************************************
 * 
 * @class StorageException - Exception if it was not possible to read or write to the file storage of the server database the Database
 * 
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
public class StorageException extends RuntimeException {

	public StorageException(String message) {
		super(message);
	}

	public StorageException(String message, Throwable cause) {
		super(message, cause);
	}

}
