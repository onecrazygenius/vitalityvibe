package dev.onecrazygenius.vitalityvibe.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

	private static Logger logger = LoggerFactory.getLogger(AuthController.class);

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
			logger.warn("User already exists");
			return ResponseEntity.badRequest().body("User already exists");
		}

		// check if email is valid
		if (signupRequest.getEmail().isEmpty() ||
			!signupRequest.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
		) {
			logger.warn("Invalid email");
			return ResponseEntity.badRequest().body("Invalid email");
		}

		// check name is valid and not empty
		if (signupRequest.getName().isEmpty() || 
			!signupRequest.getName().matches("^[a-zA-Z\\s]*$")
		) {
			logger.warn("Invalid name");
			return ResponseEntity.badRequest().body("Invalid name");
		}

		// check if password meets requirements and is not empty
		if (signupRequest.getPassword().isEmpty() ||
			!signupRequest.getPassword().matches("^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\\d\\W])|(?=.*\\W)(?=.*\\d))|(?=.*\\W)(?=.*[A-Z])(?=.*\\d)).{8,}$")
		) {
			logger.warn("Invalid password" + signupRequest.getPassword());
		}

		// set user details
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(signupRequest.getPassword());
		user.setRoles(signupRequest.getRole());
		
		service.addUser(user);
		// return a success response
		logger.info("User registered successfully");
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
