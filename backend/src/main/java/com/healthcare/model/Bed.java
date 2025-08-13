package com.healthcare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "beds")
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "bed_number", unique = true)
    private String bedNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "bed_type")
    private BedType bedType;

    @Enumerated(EnumType.STRING)
    private BedStatus status = BedStatus.AVAILABLE;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "patient_contact")
    private String patientContact;

    @Column(name = "admission_date")
    private LocalDateTime admissionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_doctor_id")
    private User assignedDoctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_nurse_id")
    private User assignedNurse;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Bed() {}

    public Bed(String bedNumber, BedType bedType, Hospital hospital) {
        this.bedNumber = bedNumber;
        this.bedType = bedType;
        this.hospital = hospital;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBedNumber() { return bedNumber; }
    public void setBedNumber(String bedNumber) { this.bedNumber = bedNumber; }

    public BedType getBedType() { return bedType; }
    public void setBedType(BedType bedType) { this.bedType = bedType; }

    public BedStatus getStatus() { return status; }
    public void setStatus(BedStatus status) { this.status = status; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getPatientContact() { return patientContact; }
    public void setPatientContact(String patientContact) { this.patientContact = patientContact; }

    public LocalDateTime getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(LocalDateTime admissionDate) { this.admissionDate = admissionDate; }

    public Hospital getHospital() { return hospital; }
    public void setHospital(Hospital hospital) { this.hospital = hospital; }

    public User getAssignedDoctor() { return assignedDoctor; }
    public void setAssignedDoctor(User assignedDoctor) { this.assignedDoctor = assignedDoctor; }

    public User getAssignedNurse() { return assignedNurse; }
    public void setAssignedNurse(User assignedNurse) { this.assignedNurse = assignedNurse; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}