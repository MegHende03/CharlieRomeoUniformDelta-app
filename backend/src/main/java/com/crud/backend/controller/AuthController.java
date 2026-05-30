package com.crud.backend.controller;

import com.crud.backend.dto.auth.AuthResponse;
import com.crud.backend.dto.auth.LogInRequest;
import com.crud.backend.dto.auth.SignUpRequest;
import com.crud.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//Controller: "Directs the flow of traffic"

//Request handler for building RESTful APIS
@RestController
//handles URL Routing path -> maps HTTP web requests
@RequestMapping("/api/auth")
public class AuthController {

    //Initialize AuthService so AuthController can access AuthService.
    //Controller communicates with service
    private final AuthService authService;

    //Give AuthController access to its service
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //PostMapping routes /signup HTTP POST requests to signUp method.
    @PostMapping("/signup")
    //If the endpoint /signup is hit -> go to authService signUp method with the SignUpRequest.
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest request) {
        return authService.signUp(request);
    }

    //PostMapping routes /login HTTP POST requests to logIn method.
    @PostMapping("/login")
    //If the endpoint /logIn is hit -> go to authService logIn method with the LogInRequest.
    public AuthResponse logIn(@Valid @RequestBody LogInRequest request) {
        return authService.logIn(request);
    }
}