package de.arthurkaul.archref.exceptions;

/*******************************************************************************************************************************************************************************************************
 * 
 * @class StorageFileNotFoundException - Exception if a file was not found in
 *        the file system of the server database the Database
 * 
 * @author Arthur Kaul
 *
 ******************************************************************************************************************************************************************************************************/
public class StorageFileNotFoundException extends StorageException {

	public StorageFileNotFoundException(String message) {
		super(message);
	}

	public StorageFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
