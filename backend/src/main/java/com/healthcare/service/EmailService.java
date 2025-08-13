package com.healthcare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Async
    public void sendVerificationEmail(String to, String name, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Healthcare Management - Email Verification");
        message.setText(String.format(
            "Dear %s,\n\n" +
            "Thank you for registering with Healthcare Management System.\n\n" +
            "Please click the following link to verify your email address:\n" +
            "%s/verify-email?token=%s\n\n" +
            "This link will expire in 15 minutes.\n\n" +
            "If you didn't create an account, please ignore this email.\n\n" +
            "Best regards,\n" +
            "Healthcare Management Team",
            name, frontendUrl, token
        ));

        mailSender.send(message);
    }

    @Async
    public void sendPasswordResetEmail(String to, String name, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Healthcare Management - Password Reset");
        message.setText(String.format(
            "Dear %s,\n\n" +
            "You have requested to reset your password.\n\n" +
            "Please click the following link to reset your password:\n" +
            "%s/reset-password?token=%s\n\n" +
            "This link will expire in 15 minutes.\n\n" +
            "If you didn't request this, please ignore this email.\n\n" +
            "Best regards,\n" +
            "Healthcare Management Team",
            name, frontendUrl, token
        ));

        mailSender.send(message);
    }
}