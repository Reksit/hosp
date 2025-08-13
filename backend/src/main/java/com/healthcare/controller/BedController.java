package com.healthcare.controller;

import com.healthcare.dto.MessageResponse;
import com.healthcare.model.Bed;
import com.healthcare.service.BedService;
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
@RequestMapping("/api/beds")
public class BedController {
    @Autowired
    private BedService bedService;

    @GetMapping("/hospital/{hospitalId}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN') or hasRole('DOCTOR') or hasRole('NURSE')")
    public ResponseEntity<List<Bed>> getHospitalBeds(@PathVariable Long hospitalId) {
        List<Bed> beds = bedService.getHospitalBeds(hospitalId);
        return ResponseEntity.ok(beds);
    }

    @PostMapping
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> createBed(@Valid @RequestBody Bed bed) {
        try {
            Bed createdBed = bedService.createBed(bed);
            return ResponseEntity.ok(createdBed);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN') or hasRole('DOCTOR') or hasRole('NURSE')")
    public ResponseEntity<?> updateBed(@PathVariable Long id, @RequestBody Bed bed) {
        try {
            Bed updatedBed = bedService.updateBed(id, bed);
            return ResponseEntity.ok(updatedBed);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<?> assignBed(
            @PathVariable Long id,
            @RequestParam String patientName,
            @RequestParam String patientContact,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(required = false) Long nurseId) {
        try {
            Bed assignedBed = bedService.assignBed(id, patientName, patientContact, doctorId, nurseId);
            return ResponseEntity.ok(assignedBed);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HOSPITAL_ADMIN')")
    public ResponseEntity<?> deleteBed(@PathVariable Long id) {
        try {
            bedService.deleteBed(id);
            return ResponseEntity.ok(new MessageResponse("Bed deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}