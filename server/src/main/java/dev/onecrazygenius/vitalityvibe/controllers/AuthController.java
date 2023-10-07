package dev.onecrazygenius.vitalityvibe.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.onecrazygenius.vitalityvibe.models.UserModel;
import dev.onecrazygenius.vitalityvibe.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody UserModel user) {
        UserModel foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser != null) {
            if (foundUser.getPassword().equals(user.getPassword())) {
                // TODO: Generate JWT token
                return "Login successful";
            } else {
                // TODO: Return error message
                return "Incorrect password";
            }
        } else {
            // TODO: Return error message
            return "User not found";
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody UserModel user) {
        UserModel foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser == null) {
            userRepository.save(user);
            // TODO: Return success message
            return "Registration successful";
        } else {
            // TODO: Return error message
            return "User already exists";
        }
    }

    @GetMapping("/logout")
    public String logout() {
        // TODO: Invalidate JWT token
        return "Logout successful";
    }
}

