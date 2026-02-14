package com.authsystem.backend.model;

import javax.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users") // Good practice to name the table explicitly
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(unique = true, nullable = false)
    private String email;
}