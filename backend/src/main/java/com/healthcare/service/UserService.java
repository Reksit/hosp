package com.healthcare.service;

import com.healthcare.model.Role;
import com.healthcare.model.User;
import com.healthcare.model.WorkHour;
import com.healthcare.repository.UserRepository;
import com.healthcare.repository.WorkHourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkHourRepository workHourRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getHospitalStaff(Long hospitalId) {
        List<Role> staffRoles = Arrays.asList(Role.DOCTOR, Role.NURSE, Role.AMBULANCE_DRIVER);
        return userRepository.findByHospitalIdAndRoleIn(hospitalId, staffRoles);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsEmailVerified(true); // Auto-verify for admin created users
        
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        
        user.setName(userDetails.getName());
        user.setRole(userDetails.getRole());
        user.setHospital(userDetails.getHospital());
        
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        return userRepository.save(user);
    }

    public List<WorkHour> getUserWorkHours(Long userId, LocalDate startDate, LocalDate endDate) {
        return workHourRepository.findByUserIdAndWorkDateBetween(userId, startDate, endDate);
    }

    public WorkHour logWorkHours(WorkHour workHour) {
        // Check if work hour entry already exists for this date
        if (workHourRepository.findByUserIdAndWorkDate(workHour.getUser().getId(), workHour.getWorkDate()).isPresent()) {
            throw new RuntimeException("Work hours already logged for this date");
        }
        
        // Calculate overtime if actual hours exceed scheduled hours
        if (workHour.getActualHours() != null && workHour.getScheduledHours() != null) {
            double overtime = Math.max(0, workHour.getActualHours() - workHour.getScheduledHours());
            workHour.setOvertimeHours(overtime);
        }
        
        return workHourRepository.save(workHour);
    }
}