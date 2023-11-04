package dev.onecrazygenius.springapi.exercise;

import dev.onecrazygenius.springapi.user.User;
import dev.onecrazygenius.springapi.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository repository;
    private final UserRepository userRepository;

    public void save(ExerciseRequest request) {
        // get the user from the jwt token
        User user = this.getUser();

        var sleep = Exercise.builder()
            .user(user)
            .datetime(request.getDatetime())
            .duration(request.getDuration())
            .calories(request.getCalories())
            .type(request.getType())
            .build();
        repository.save(sleep);
    }

    public List<Exercise> findAll() {
        User user = this.getUser();
        return repository.findAllByUser(user);
    }

    private User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                String email = ((UserDetails) principal).getUsername();
                return userRepository.findByEmail(email).orElseThrow();
            }
        }
        throw new RuntimeException("User not found in the JWT token.");
    }
}