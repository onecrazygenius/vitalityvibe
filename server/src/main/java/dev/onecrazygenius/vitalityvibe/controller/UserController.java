package dev.onecrazygenius.vitalityvibe.controller;

import dev.onecrazygenius.vitalityvibe.model.User;
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;
import dev.onecrazygenius.vitalityvibe.payload.request.UserRequest;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://127.0.0.1:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl service;

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> userProfile() {
        logger.info("User profile request");

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                String email = userDetails.getUsername();

                if (isValidEmail(email)) {
                    User user = service.getUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

                    if (isValidRoles(user.getRoles())) {
                        Map<String, Object> profile = new HashMap<>();
                        profile.put("name", user.getName());
                        profile.put("email", user.getEmail());
                        profile.put("bio", user.getBio());
                        profile.put("roles", user.getRoles());
                        return ResponseEntity.ok(profile);
                    }
                }
            }

            logger.warn("Invalid user profile request");
            return ResponseEntity.badRequest().body("Invalid user profile request");
        } catch (Exception e) {
            logger.error("Error in user profile request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PatchMapping("/profile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserRequest user) {
        logger.info("User profile update request");

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                String email = userDetails.getUsername();

                if (isValidEmail(email)) {
                    User existingUser = service.getUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

                    if (isValidName(user.getName()) && isValidEmail(user.getEmail())) {
                        existingUser.setName(user.getName());
                        existingUser.setEmail(user.getEmail());
                        existingUser.setBio(user.getBio());

                        service.updateUser(existingUser);

                        return ResponseEntity.ok("User profile updated successfully");
                    }
                }
            }

            logger.warn("Invalid user profile update request");
            return ResponseEntity.badRequest().body("Invalid user profile update request");
        } catch (Exception e) {
            logger.error("Error in user profile update request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    // Helper methods for validation
    private boolean isValidEmail(String email) {
        return email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z\\s]*$");
    }

    private boolean isValidRoles(String roles) {
		List<String> validRoles = Arrays.asList("ROLE_USER", "ROLE_ADMIN");
		return validRoles.contains(roles);
	}	
}
