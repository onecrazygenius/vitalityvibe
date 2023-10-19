package dev.onecrazygenius.vitalityvibe.payload.request;

import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest { 

	private String email; 
	private String password; 

	public String getUsername() { 
		return email; 
	}

	public void setUsername(String username) { 
		this.email = username; 
	}

}

