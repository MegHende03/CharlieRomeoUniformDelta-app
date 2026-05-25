package com.crud.backend.service;
import com.crud.backend.dto.auth.AuthResponse;
import com.crud.backend.dto.auth.LogInRequest;
import com.crud.backend.dto.auth.SignUpRequest;
import com.crud.backend.exception.BadRequestException;
import com.crud.backend.model.User;
import com.crud.backend.repository.UserRepository;
import com.crud.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use.");
        }

        User user = new User();
        user.setFullname(request.getFullname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(savedUser.getId(), savedUser.getEmail(), savedUser.getFullname(), token);
    }

    public AuthResponse logIn(LogInRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password."));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new BadRequestException("Invalid email or password.");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(user.getId(), user.getEmail(), user.getFullname(), token);
    }
}
