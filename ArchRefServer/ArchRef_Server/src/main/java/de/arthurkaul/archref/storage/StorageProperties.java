package de.arthurkaul.archref.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

/********************************************************************************************************************************************************************************************************
 * 
 * @class - <StorageProperties> - Define the properties for storing files in the file system of the server. For example the location where the files should be stored.
 * 
 * @field - String location - Folder in which the files will be stored on the server
 * 
 * @author Arthur Kaul
 *
 *******************************************************************************************************************************************************************************************************/
@ConfigurationProperties("storage")
public class StorageProperties {

	/***************************************************************************************************************************************************************************************************
	 *
	 * @fields
	 * 
	 **************************************************************************************************************************************************************************************************/

	private String location = "UploadData";

	/***************************************************************************************************************************************************************************************************
	 * 
	 * @getter / @setter - Getter and Setter for the fields
	 * 
	 **************************************************************************************************************************************************************************************************/
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
