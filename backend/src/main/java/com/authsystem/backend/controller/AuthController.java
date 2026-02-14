package com.authsystem.backend.controller;

import com.authsystem.backend.dto.AuthResponse;
import com.authsystem.backend.dto.LoginRequest;
import com.authsystem.backend.dto.RegisterRequest;
import com.authsystem.backend.model.User;
import com.authsystem.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request.getUsername(), request.getEmail(), request.getPassword());
            AuthResponse response = new AuthResponse(true, "Registration successful", "temp-token-" + user.getId(), user.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(false, e.getMessage(), null, null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());
            AuthResponse response = new AuthResponse(true, "Login successful", "temp-token-" + user.getId(), user.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(false, e.getMessage(), null, null);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
