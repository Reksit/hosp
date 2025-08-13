package com.healthcare.dto;

import com.healthcare.model.AmbulanceStatus;
import com.healthcare.model.EmergencyLevel;
import jakarta.validation.constraints.NotNull;

public class AmbulanceLocationUpdate {
    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    private AmbulanceStatus status;
    private String pickupAddress;
    private String patientName;
    private EmergencyLevel emergencyLevel;

    // Constructors
    public AmbulanceLocationUpdate() {}

    public AmbulanceLocationUpdate(Double latitude, Double longitude, AmbulanceStatus status) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
    }

    // Getters and Setters
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public AmbulanceStatus getStatus() { return status; }
    public void setStatus(AmbulanceStatus status) { this.status = status; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public EmergencyLevel getEmergencyLevel() { return emergencyLevel; }
    public void setEmergencyLevel(EmergencyLevel emergencyLevel) { this.emergencyLevel = emergencyLevel; }
}