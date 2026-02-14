package com.authsystem.backend.service;

import com.authsystem.backend.model.User;
import com.authsystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User register(String username, String email, String password) {
        // Check if user already exists
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // In production, hash the password!
        
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        
        return user;
    }
}
