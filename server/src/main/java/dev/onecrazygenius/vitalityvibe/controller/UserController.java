package dev.onecrazygenius.vitalityvibe.controller;

import dev.onecrazygenius.vitalityvibe.model.User;
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;
import dev.onecrazygenius.vitalityvibe.payload.request.UserRequest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

	private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl service;

    @GetMapping("/profile")  
    @PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<?> userProfile() { 
        logger.info("User profile request");
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (principal instanceof UserDetails) {
			UserDetails userDetails = (UserDetails) principal;

			// Attempt to extract the email from the user details
			String email = userDetails.getUsername();
			// Add some logging to help diagnose the issue
			logger.info("Extracted email: " + email);

			// Get user by email, if user exists
			User user = service.getUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

			// Return the user profile as a map
			Map<String, Object> profile = new HashMap<>();
			profile.put("name", user.getName());
			profile.put("email", user.getEmail());
			profile.put("bio", user.getBio());
			profile.put("roles", user.getRoles());
			return ResponseEntity.ok(profile);
		} else {
			// Handle the case where the principal is not of the expected type
			logger.warn("Invalid user profile request");
			return ResponseEntity.badRequest().body("Invalid user profile request");
		}
	} 

	@PatchMapping("/profile")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserRequest user) {
		logger.info("User profile update request");

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if (principal instanceof UserDetails) {
			UserDetails userDetails = (UserDetails) principal;

			// Attempt to extract the email from the user details
			String email = userDetails.getUsername();
			// Add some logging to help diagnose the issue
			logger.info("Extracted email: " + email);

			// Get user by email, if user exists
			User existingUser = service.getUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

			// Update the user profile
			existingUser.setName(user.getName());
			existingUser.setEmail(user.getEmail());
			existingUser.setBio(user.getBio());

			// Save the updated user profile
			service.updateUser(existingUser);

			// Return happy
			return ResponseEntity.ok("User profile updated successfully");
		} else {
			// Handle the case where the principal is not of the expected type
			logger.warn("Invalid user profile update request");
			return ResponseEntity.badRequest().body("Invalid user profile update request");
		}
	}

}
