package dev.onecrazygenius.vitalityvibe.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.onecrazygenius.vitalityvibe.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login() {
        return "Login";
    }

    @GetMapping("/register")
    public String register() {
        return "Register";
    }
}

