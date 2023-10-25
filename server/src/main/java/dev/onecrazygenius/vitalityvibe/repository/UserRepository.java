package dev.onecrazygenius.vitalityvibe.repository;

// dev.onecrazygenius.vitalityvibe (vitalityvibe)
import dev.onecrazygenius.vitalityvibe.model.User;

// org.springframework (springframework)
import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository; 

// java.util (java.util)
import java.util.Optional; 

@Repository
public interface UserRepository extends JpaRepository<User, Integer> { 
	Optional<User> findByEmail(String email);
}
