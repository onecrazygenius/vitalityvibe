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

@RestController
@RequestMapping("/auth") 
public class UserController { 

	@Autowired
	private UserServiceImpl service;

	@Autowired
	private JwtService jwtService; 

	@Autowired
	private AuthenticationManager authenticationManager; 

	@GetMapping("/welcome") 
	public String welcome() { 
		return "Welcome this endpoint is not secure"; 
	} 

	@PostMapping("/signup") 
	public String signup(@RequestBody SignupRequest signupRequest) {
		User user = new User();
		user.setName(signupRequest.getUsername());
		user.setPassword(signupRequest.getPassword());
		user.setEmail(signupRequest.getEmail());
		user.setRoles(signupRequest.getRole());
		service.addUser(user);
		return "User added successfully";
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

	@PostMapping("/token") 
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
		System.out.println(usernamePasswordAuthenticationToken);
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

} 
