package dev.onecrazygenius.vitalityvibe.controller;

import dev.onecrazygenius.vitalityvibe.model.User;
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserServiceImpl service;

    @GetMapping("/profile")  
    @PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<?> userProfile() { 
        System.out.println("User profile request");
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (principal instanceof UserDetails) {
			UserDetails userDetails = (UserDetails) principal;

			// Attempt to extract the email from the user details
			String email = userDetails.getUsername();
			// Add some logging to help diagnose the issue
			System.out.println("Extracted email: " + email);

			// Get user by email, if user exists
			User user = service.getUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));

			// Return the user profile as a map
			Map<String, Object> profile = new HashMap<>();
			profile.put("name", user.getName());
			profile.put("email", user.getEmail());
			profile.put("roles", user.getRoles());
			return ResponseEntity.ok(profile);
		} else {
			// Handle the case where the principal is not of the expected type
			return ResponseEntity.badRequest().body("Invalid user profile request");
		}
	} 

}
