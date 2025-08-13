package com.healthcare.service;

import com.healthcare.model.Hospital;
import com.healthcare.model.Role;
import com.healthcare.repository.AmbulanceRepository;
import com.healthcare.repository.BedRepository;
import com.healthcare.repository.HospitalRepository;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HospitalService {
    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AmbulanceRepository ambulanceRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital getHospitalById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));
    }

    public Hospital createHospital(Hospital hospital) {
        if (hospitalRepository.findByName(hospital.getName()).isPresent()) {
            throw new RuntimeException("Hospital with this name already exists");
        }
        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Hospital hospital = getHospitalById(id);
        
        hospital.setName(hospitalDetails.getName());
        hospital.setAddress(hospitalDetails.getAddress());
        hospital.setPhone(hospitalDetails.getPhone());
        hospital.setLatitude(hospitalDetails.getLatitude());
        hospital.setLongitude(hospitalDetails.getLongitude());
        
        return hospitalRepository.save(hospital);
    }

    public Map<String, Object> getHospitalStats(Long hospitalId) {
        Hospital hospital = getHospitalById(hospitalId);
        
        Map<String, Object> stats = new HashMap<>();
        
        // Bed statistics
        Long totalBeds = bedRepository.countTotalByHospitalId(hospitalId);
        Long availableBeds = bedRepository.countAvailableByHospitalId(hospitalId);
        
        stats.put("totalBeds", totalBeds);
        stats.put("availableBeds", availableBeds);
        stats.put("occupiedBeds", totalBeds - availableBeds);
        
        // Staff statistics
        Long doctors = userRepository.countByHospitalIdAndRole(hospitalId, Role.DOCTOR);
        Long nurses = userRepository.countByHospitalIdAndRole(hospitalId, Role.NURSE);
        Long drivers = userRepository.countByHospitalIdAndRole(hospitalId, Role.AMBULANCE_DRIVER);
        
        stats.put("doctors", doctors);
        stats.put("nurses", nurses);
        stats.put("drivers", drivers);
        
        // Ambulance statistics
        Long totalAmbulances = ambulanceRepository.countActiveByHospitalId(hospitalId);
        stats.put("ambulances", totalAmbulances);
        
        return stats;
    }
}