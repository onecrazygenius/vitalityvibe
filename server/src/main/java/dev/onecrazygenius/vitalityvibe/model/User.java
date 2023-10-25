package dev.onecrazygenius.vitalityvibe.model;

// jakarta.persistence (jakarta.persistence)
import jakarta.persistence.GenerationType; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.Entity; 
import jakarta.persistence.Table;
import jakarta.persistence.Id; 

// lombok (lombok)
import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User { 
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id; 
	private String name; 
	private String email; 
	private String bio;
	private String password; 
	private String roles; 

} 
