package dev.onecrazygenius.springapi.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // find user by email
    Optional<User> findByEmail(String email);
}
