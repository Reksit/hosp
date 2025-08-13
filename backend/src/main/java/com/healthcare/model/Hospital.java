package com.healthcare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "hospitals")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 255)
    private String address;

    @Size(max = 20)
    private String phone;

    @Column(name = "total_beds")
    private Integer totalBeds = 0;

    @Column(name = "available_beds")
    private Integer availableBeds = 0;

    private Double latitude;
    private Double longitude;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    private Set<User> staff = new HashSet<>();

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    private Set<Bed> beds = new HashSet<>();

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    private Set<Ambulance> ambulances = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Hospital() {}

    public Hospital(String name, String address, String phone) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getTotalBeds() { return totalBeds; }
    public void setTotalBeds(Integer totalBeds) { this.totalBeds = totalBeds; }

    public Integer getAvailableBeds() { return availableBeds; }
    public void setAvailableBeds(Integer availableBeds) { this.availableBeds = availableBeds; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Set<User> getStaff() { return staff; }
    public void setStaff(Set<User> staff) { this.staff = staff; }

    public Set<Bed> getBeds() { return beds; }
    public void setBeds(Set<Bed> beds) { this.beds = beds; }

    public Set<Ambulance> getAmbulances() { return ambulances; }
    public void setAmbulances(Set<Ambulance> ambulances) { this.ambulances = ambulances; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}