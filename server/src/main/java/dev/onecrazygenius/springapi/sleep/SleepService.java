package dev.onecrazygenius.springapi.sleep;

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
public class SleepService {

    private final SleepRepository repository;
    private final UserRepository userRepository;

    public void save(SleepRequest request) {
        // get the user from the jwt token
        User user = this.getUser();

        var sleep = Sleep.builder()
            .user(user)
            .startTime(request.getStart())
            .endTime(request.getEnd())
            .duration(request.getDuration())
            .quality(request.getQuality())
            .build();
        repository.save(sleep);
    }

    public List<Sleep> findAll() {
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