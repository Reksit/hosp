package com.healthcare.repository;

import com.healthcare.model.Ambulance;
import com.healthcare.model.AmbulanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AmbulanceRepository extends JpaRepository<Ambulance, Long> {
    List<Ambulance> findByHospitalId(Long hospitalId);
    
    List<Ambulance> findByHospitalIdAndStatus(Long hospitalId, AmbulanceStatus status);
    
    Optional<Ambulance> findByDriverId(Long driverId);
    
    Optional<Ambulance> findByVehicleNumber(String vehicleNumber);
    
    @Query("SELECT COUNT(a) FROM Ambulance a WHERE a.hospital.id = :hospitalId AND a.status != 'MAINTENANCE'")
    Long countActiveByHospitalId(@Param("hospitalId") Long hospitalId);
}