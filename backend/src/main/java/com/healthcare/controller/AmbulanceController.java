package com.healthcare.controller;

import com.healthcare.dto.AmbulanceLocationUpdate;
import com.healthcare.dto.MessageResponse;
import com.healthcare.model.Ambulance;
import com.healthcare.service.AmbulanceService;
import com.healthcare.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ambulances")
public class AmbulanceController {
    @Autowired
    private AmbulanceService ambulanceService;

    @GetMapping("/hospital/{hospitalId}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<List<Ambulance>> getHospitalAmbulances(@PathVariable Long hospitalId) {
        List<Ambulance> ambulances = ambulanceService.getHospitalAmbulances(hospitalId);
        return ResponseEntity.ok(ambulances);
    }

    @GetMapping("/my-ambulance")
    @PreAuthorize("hasRole('AMBULANCE_DRIVER')")
    public ResponseEntity<Ambulance> getMyAmbulance(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Ambulance ambulance = ambulanceService.getAmbulanceByDriverId(userPrincipal.getId());
        return ResponseEntity.ok(ambulance);
    }

    @PutMapping("/update-location")
    @PreAuthorize("hasRole('AMBULANCE_DRIVER')")
    public ResponseEntity<?> updateLocation(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody AmbulanceLocationUpdate locationUpdate) {
        try {
            ambulanceService.updateAmbulanceLocation(userPrincipal.getId(), locationUpdate);
            return ResponseEntity.ok(new MessageResponse("Location updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> createAmbulance(@RequestBody Ambulance ambulance) {
        try {
            Ambulance createdAmbulance = ambulanceService.createAmbulance(ambulance);
            return ResponseEntity.ok(createdAmbulance);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> updateAmbulance(@PathVariable Long id, @RequestBody Ambulance ambulance) {
        try {
            Ambulance updatedAmbulance = ambulanceService.updateAmbulance(id, ambulance);
            return ResponseEntity.ok(updatedAmbulance);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> deleteAmbulance(@PathVariable Long id) {
        try {
            ambulanceService.deleteAmbulance(id);
            return ResponseEntity.ok(new MessageResponse("Ambulance deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}