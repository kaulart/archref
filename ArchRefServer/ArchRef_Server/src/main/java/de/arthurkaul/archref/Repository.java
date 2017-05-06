package de.arthurkaul.archref;

public class Repository {
	
	private String name; 
	
	public Repository(String name){
		this.setName(name);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
