package dev.onecrazygenius.vitalityvibe.controller;

// dev.onecrazygenius.vitalityvibe (vitalityvibe)
import dev.onecrazygenius.vitalityvibe.payload.request.SignUpRequest;
import dev.onecrazygenius.vitalityvibe.payload.request.AuthRequest;
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;
import dev.onecrazygenius.vitalityvibe.service.JwtService; 
import dev.onecrazygenius.vitalityvibe.model.User; 

// org.springframework (springframework)
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication; 
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import org.springframework.http.ResponseEntity;

// java.util (java)
import java.util.HashMap;
import java.util.Map;

// org.slf4j (logger)
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserServiceImpl service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signupRequest) {
        try {
            // Validate signup request
            if (!isValidEmail(signupRequest.getEmail()) || !isValidName(signupRequest.getName()) || !isValidPassword(signupRequest.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid input data");
            }

            // Check if user already exists
            if (service.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest().body("User already exists");
            }

            // Set user details
            User user = new User();
            user.setName(signupRequest.getName());
            user.setEmail(signupRequest.getEmail());
			user.setPassword(signupRequest.getPassword());
            user.setRoles(signupRequest.getRole());

            service.addUser(user);

            // Return a success response
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            logger.error("Error during user registration: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid input data");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            // Validate login request
            if (!isValidEmail(authRequest.getUsername())) {
                return ResponseEntity.badRequest().body("Invalid email");
            }

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            if (authentication.isAuthenticated()) {
                Map<String, String> map = new HashMap<>();
                map.put("token", jwtService.generateToken(authRequest.getUsername()));
                return ResponseEntity.ok(map);
            } else {
                return ResponseEntity.badRequest().body("Invalid login request");
            }
        } catch (Exception e) {
            logger.error("Error during login: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid login request");
        }
    }

    // Helper methods for validation and security
    private boolean isValidEmail(String email) {
        return email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z\\s]*$");
    }

    private boolean isValidPassword(String password) {
        return password.matches("^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\\d\\W])|(?=.*\\W)(?=.*\\d))|(?=.*\\W)(?=.*[A-Z])(?=.*\\d)).{8,}$");
    }
}

