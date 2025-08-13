package com.healthcare.dto;

public class HospitalStatsResponse {
    private Long totalBeds;
    private Long availableBeds;
    private Long occupiedBeds;
    private Long doctors;
    private Long nurses;
    private Long drivers;
    private Long ambulances;

    public HospitalStatsResponse() {}

    public HospitalStatsResponse(Long totalBeds, Long availableBeds, Long occupiedBeds, 
                               Long doctors, Long nurses, Long drivers, Long ambulances) {
        this.totalBeds = totalBeds;
        this.availableBeds = availableBeds;
        this.occupiedBeds = occupiedBeds;
        this.doctors = doctors;
        this.nurses = nurses;
        this.drivers = drivers;
        this.ambulances = ambulances;
    }

    // Getters and Setters
    public Long getTotalBeds() { return totalBeds; }
    public void setTotalBeds(Long totalBeds) { this.totalBeds = totalBeds; }

    public Long getAvailableBeds() { return availableBeds; }
    public void setAvailableBeds(Long availableBeds) { this.availableBeds = availableBeds; }

    public Long getOccupiedBeds() { return occupiedBeds; }
    public void setOccupiedBeds(Long occupiedBeds) { this.occupiedBeds = occupiedBeds; }

    public Long getDoctors() { return doctors; }
    public void setDoctors(Long doctors) { this.doctors = doctors; }

    public Long getNurses() { return nurses; }
    public void setNurses(Long nurses) { this.nurses = nurses; }

    public Long getDrivers() { return drivers; }
    public void setDrivers(Long drivers) { this.drivers = drivers; }

    public Long getAmbulances() { return ambulances; }
    public void setAmbulances(Long ambulances) { this.ambulances = ambulances; }
}