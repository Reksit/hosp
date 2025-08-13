package com.healthcare.service;

import com.healthcare.model.Bed;
import com.healthcare.model.BedStatus;
import com.healthcare.model.User;
import com.healthcare.repository.BedRepository;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BedService {
    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Bed> getHospitalBeds(Long hospitalId) {
        return bedRepository.findByHospitalId(hospitalId);
    }

    public Bed createBed(Bed bed) {
        if (bedRepository.findByBedNumber(bed.getBedNumber()).isPresent()) {
            throw new RuntimeException("Bed with this number already exists");
        }
        return bedRepository.save(bed);
    }

    public Bed updateBed(Long id, Bed bedDetails) {
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        bed.setBedType(bedDetails.getBedType());
        bed.setStatus(bedDetails.getStatus());
        
        return bedRepository.save(bed);
    }

    public Bed assignBed(Long bedId, String patientName, String patientContact, Long doctorId, Long nurseId) {
        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        if (bed.getStatus() != BedStatus.AVAILABLE) {
            throw new RuntimeException("Bed is not available");
        }

        bed.setPatientName(patientName);
        bed.setPatientContact(patientContact);
        bed.setAdmissionDate(LocalDateTime.now());
        bed.setStatus(BedStatus.OCCUPIED);

        if (doctorId != null) {
            User doctor = userRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            bed.setAssignedDoctor(doctor);
        }

        if (nurseId != null) {
            User nurse = userRepository.findById(nurseId)
                    .orElseThrow(() -> new RuntimeException("Nurse not found"));
            bed.setAssignedNurse(nurse);
        }

        return bedRepository.save(bed);
    }

    public void deleteBed(Long id) {
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));
        
        if (bed.getStatus() == BedStatus.OCCUPIED) {
            throw new RuntimeException("Cannot delete occupied bed");
        }
        
        bedRepository.delete(bed);
    }
}