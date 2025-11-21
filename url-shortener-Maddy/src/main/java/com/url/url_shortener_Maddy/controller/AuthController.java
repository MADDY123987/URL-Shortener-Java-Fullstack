// src/main/java/com/url/url_shortener_Maddy/controller/AuthController.java
package com.url.url_shortener_Maddy.controller;

import com.url.url_shortener_Maddy.dtos.LoginRequest;
import com.url.url_shortener_Maddy.dtos.RegisterRequest;
import com.url.url_shortener_Maddy.models.User;
import com.url.url_shortener_Maddy.security.jwt.JwtAuthenticationResponse;
import com.url.url_shortener_Maddy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// Remove or adjust origins in production
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/public/login")
    public ResponseEntity<JwtAuthenticationResponse> loginUser(
            @RequestBody LoginRequest loginRequest
    ) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @PostMapping("/public/register")
    public ResponseEntity<String> registerUser(
            @RequestBody RegisterRequest req
    ) {
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword()); // encoded inside service
        user.setEmail(req.getEmail());
        user.setRole("ROLE_USER");

        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
