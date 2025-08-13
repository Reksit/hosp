package com.healthcare.service;

import com.healthcare.dto.*;
import com.healthcare.model.Hospital;
import com.healthcare.model.Role;
import com.healthcare.model.User;
import com.healthcare.repository.HospitalRepository;
import com.healthcare.repository.UserRepository;
import com.healthcare.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HospitalRepository hospitalRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    @Value("${app.verification-token-expiration}")
    private long verificationTokenExpiration;

    public MessageResponse registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new MessageResponse("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(),
                           signUpRequest.getEmail(),
                           encoder.encode(signUpRequest.getPassword()),
                           Role.valueOf(signUpRequest.getRole().toUpperCase()));

        if (signUpRequest.getHospitalId() != null) {
            Hospital hospital = hospitalRepository.findById(signUpRequest.getHospitalId())
                    .orElseThrow(() -> new RuntimeException("Error: Hospital not found."));
            user.setHospital(hospital);
        }

        // Generate verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusMinutes(15));

        userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(user.getEmail(), user.getName(), verificationToken);

        return new MessageResponse("User registered successfully! Please check your email for verification.");
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        if (!userRepository.existsByEmail(loginRequest.getEmail())) {
            throw new RuntimeException("Error: User not found!");
        }

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        if (!user.getIsEmailVerified()) {
            throw new RuntimeException("Error: Please verify your email first!");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        String hospitalName = user.getHospital() != null ? user.getHospital().getName() : null;
        Long hospitalId = user.getHospital() != null ? user.getHospital().getId() : null;

        return new JwtResponse(jwt,
                             user.getId(),
                             user.getName(),
                             user.getEmail(),
                             user.getRole().name(),
                             hospitalId,
                             hospitalName,
                             user.getIsEmailVerified());
    }

    public MessageResponse verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Error: Invalid verification token!"));

        if (user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Error: Verification token has expired!");
        }

        user.setIsEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        userRepository.save(user);

        return new MessageResponse("Email verified successfully!");
    }

    public MessageResponse resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        if (user.getIsEmailVerified()) {
            return new MessageResponse("Email is already verified!");
        }

        // Generate new verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // Send verification email
        emailService.sendVerificationEmail(user.getEmail(), user.getName(), verificationToken);

        return new MessageResponse("Verification email sent successfully!");
    }
}