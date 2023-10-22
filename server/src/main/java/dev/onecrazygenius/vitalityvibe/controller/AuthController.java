package dev.onecrazygenius.vitalityvibe.controller;

import java.util.HashMap;
import java.util.Map;

import dev.onecrazygenius.vitalityvibe.payload.request.AuthRequest;
import dev.onecrazygenius.vitalityvibe.payload.request.SignUpRequest;
import dev.onecrazygenius.vitalityvibe.model.User; 
import dev.onecrazygenius.vitalityvibe.service.JwtService; 
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.web.bind.annotation.*; 
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth") 
public class AuthController { 

	@Autowired
	private UserServiceImpl service;

	@Autowired
	private JwtService jwtService; 

	@Autowired
	private AuthenticationManager authenticationManager; 

	@PostMapping("/signup") 
	public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signupRequest) {
		User user = new User();

		/*
		 * Validate signup request
		 */

		// check if user already exists
		if (service.existsByEmail(signupRequest.getEmail())) {
			// return a bad request response
			return ResponseEntity.badRequest().body("User already exists");
		}

		// check if email is valid
		if (signupRequest.getEmail().isEmpty() ||
			!signupRequest.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
		) {
			return ResponseEntity.badRequest().body("Invalid email");
		}

		// check name is valid and not empty
		if (signupRequest.getName().isEmpty() || 
			!signupRequest.getName().matches("^[a-zA-Z\\s]*$")
		) {
			return ResponseEntity.badRequest().body("Invalid name");
		}

		// check if password meets requirements
		if (signupRequest.getPassword().isEmpty() ||
			!signupRequest.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")
		) {
			return ResponseEntity.badRequest().body("Invalid password");
		}

		// set user details
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(signupRequest.getPassword());
		user.setRoles(signupRequest.getRole());
		
		service.addUser(user);
		// return a success response
		return ResponseEntity.ok("User registered successfully");
	} 

	@PostMapping("/login") 
	public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {

		/*
		 * Validate login request
		 */

		// check if email is valid
		if (authRequest.getUsername().isEmpty() ||
			!authRequest.getUsername().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
		) {
			return ResponseEntity.badRequest().body("Invalid email");
		}

		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
		try {
			Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			if (authentication.isAuthenticated()) { 
				Map<String, String> map = new HashMap<>();
				map.put("token", jwtService.generateToken(authRequest.getUsername()));
				return ResponseEntity.ok(map);
			} else { 
				throw new UsernameNotFoundException("invalid user request !"); 
			} 
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body("Invalid login request");
		}
	} 
} 
