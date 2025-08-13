package com.healthcare.service;

import com.healthcare.dto.AmbulanceLocationUpdate;
import com.healthcare.model.Ambulance;
import com.healthcare.model.User;
import com.healthcare.repository.AmbulanceRepository;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AmbulanceService {
    @Autowired
    private AmbulanceRepository ambulanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public List<Ambulance> getHospitalAmbulances(Long hospitalId) {
        return ambulanceRepository.findByHospitalId(hospitalId);
    }

    public Ambulance getAmbulanceByDriverId(Long driverId) {
        return ambulanceRepository.findByDriverId(driverId)
                .orElseThrow(() -> new RuntimeException("Ambulance not found for driver"));
    }

    public void updateAmbulanceLocation(Long driverId, AmbulanceLocationUpdate locationUpdate) {
        Ambulance ambulance = getAmbulanceByDriverId(driverId);
        
        ambulance.setCurrentLatitude(locationUpdate.getLatitude());
        ambulance.setCurrentLongitude(locationUpdate.getLongitude());
        
        if (locationUpdate.getStatus() != null) {
            ambulance.setStatus(locationUpdate.getStatus());
        }
        
        if (locationUpdate.getPickupAddress() != null) {
            ambulance.setPickupAddress(locationUpdate.getPickupAddress());
        }
        
        if (locationUpdate.getPatientName() != null) {
            ambulance.setPatientName(locationUpdate.getPatientName());
        }
        
        if (locationUpdate.getEmergencyLevel() != null) {
            ambulance.setEmergencyLevel(locationUpdate.getEmergencyLevel());
        }

        ambulance = ambulanceRepository.save(ambulance);

        // Send real-time update to hospital admin
        messagingTemplate.convertAndSend(
            "/topic/ambulance-updates/" + ambulance.getHospital().getId(),
            ambulance
        );
    }

    public Ambulance createAmbulance(Ambulance ambulance) {
        if (ambulanceRepository.findByVehicleNumber(ambulance.getVehicleNumber()).isPresent()) {
            throw new RuntimeException("Ambulance with this vehicle number already exists");
        }
        return ambulanceRepository.save(ambulance);
    }

    public Ambulance updateAmbulance(Long id, Ambulance ambulanceDetails) {
        Ambulance ambulance = ambulanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ambulance not found"));

        ambulance.setVehicleNumber(ambulanceDetails.getVehicleNumber());
        ambulance.setStatus(ambulanceDetails.getStatus());
        
        if (ambulanceDetails.getDriver() != null) {
            User driver = userRepository.findById(ambulanceDetails.getDriver().getId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
            ambulance.setDriver(driver);
        }

        return ambulanceRepository.save(ambulance);
    }

    public void deleteAmbulance(Long id) {
        Ambulance ambulance = ambulanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ambulance not found"));
        ambulanceRepository.delete(ambulance);
    }
}