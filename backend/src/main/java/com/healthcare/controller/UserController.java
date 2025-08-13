package com.healthcare.controller;

import com.healthcare.dto.MessageResponse;
import com.healthcare.model.User;
import com.healthcare.model.WorkHour;
import com.healthcare.service.UserService;
import com.healthcare.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/hospital/{hospitalId}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<List<User>> getHospitalStaff(@PathVariable Long hospitalId) {
        List<User> staff = userService.getHospitalStaff(hospitalId);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('AMBULANCE_DRIVER') or hasRole('HOSPITAL_ADMIN') or hasRole('DOCTOR') or hasRole('NURSE')")
    public ResponseEntity<User> getUserProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            User user = userService.getUserById(userPrincipal.getId());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/{id}/work-hours")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN') or hasRole('DOCTOR') or hasRole('NURSE')")
    public ResponseEntity<List<WorkHour>> getUserWorkHours(
            @PathVariable Long id,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().minusDays(30);
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();
            
            List<WorkHour> workHours = userService.getUserWorkHours(id, start, end);
            return ResponseEntity.ok(workHours);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/work-hours")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('NURSE')")
    public ResponseEntity<?> logWorkHours(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody WorkHour workHour) {
        try {
            workHour.setUser(userService.getUserById(userPrincipal.getId()));
            WorkHour savedWorkHour = userService.logWorkHours(workHour);
            return ResponseEntity.ok(savedWorkHour);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}