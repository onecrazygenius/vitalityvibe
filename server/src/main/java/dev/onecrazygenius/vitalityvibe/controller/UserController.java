package dev.onecrazygenius.vitalityvibe.controller;

import dev.onecrazygenius.vitalityvibe.payload.request.AuthRequest;
import dev.onecrazygenius.vitalityvibe.payload.request.SignupRequest;
import dev.onecrazygenius.vitalityvibe.model.User; 
import dev.onecrazygenius.vitalityvibe.service.JwtService; 
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.web.bind.annotation.*; 

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth") 
public class UserController { 

	@Autowired
	private UserServiceImpl service;

	@Autowired
	private JwtService jwtService; 

	@Autowired
	private AuthenticationManager authenticationManager; 

	@PostMapping("/signup") 
	public String signup(@RequestBody SignupRequest signupRequest) {
		User user = new User();

		/*
		 * Validate signup request
		 */

		// check if user already exists
		if (service.existsByEmail(signupRequest.getEmail())) {
			return "User already exists";
		}

		// check if email is valid
		if (signupRequest.getEmail().isEmpty() ||
			!signupRequest.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
		) {
			return "Invalid email";
		}

		// check name is valid and not empty
		if (signupRequest.getName().isEmpty() || 
			!signupRequest.getName().matches("^[a-zA-Z\\s]*$")
		) {
			return "Invalid name";
		}

		// check if password meets requirements
		if (signupRequest.getPassword().isEmpty() ||
			!signupRequest.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")
		) {
			return "Invalid password";
		}

		// set user details
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(signupRequest.getPassword());
		user.setRoles(signupRequest.getRole());
		
		service.addUser(user);
		return "User added successfully";
	} 

	@PostMapping("/login") 
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
		try {
			Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			if (authentication.isAuthenticated()) { 
				return jwtService.generateToken(authRequest.getUsername()); 
			} else { 
				throw new UsernameNotFoundException("invalid user request !"); 
			} 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "error";
	} 

	@GetMapping("/user/profile") 
	@PreAuthorize("hasAuthority('ROLE_USER')") 
	public String userProfile() { 
		return "Welcome to User Profile"; 
	} 

	@GetMapping("/admin/profile") 
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") 
	public String adminProfile() { 
		return "Welcome to Admin Profile"; 
	} 

} 
