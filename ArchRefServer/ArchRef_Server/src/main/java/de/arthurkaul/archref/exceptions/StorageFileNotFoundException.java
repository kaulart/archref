package de.arthurkaul.archref.exceptions;

public class StorageFileNotFoundException extends StorageException {
	
	public StorageFileNotFoundException(String message) {
		super(message);
	}

	public StorageFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
