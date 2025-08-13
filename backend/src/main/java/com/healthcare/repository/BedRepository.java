package com.healthcare.repository;

import com.healthcare.model.Bed;
import com.healthcare.model.BedStatus;
import com.healthcare.model.BedType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByHospitalId(Long hospitalId);
    
    List<Bed> findByHospitalIdAndStatus(Long hospitalId, BedStatus status);
    
    List<Bed> findByHospitalIdAndBedType(Long hospitalId, BedType bedType);
    
    Optional<Bed> findByBedNumber(String bedNumber);
    
    @Query("SELECT COUNT(b) FROM Bed b WHERE b.hospital.id = :hospitalId AND b.status = 'AVAILABLE'")
    Long countAvailableByHospitalId(@Param("hospitalId") Long hospitalId);
    
    @Query("SELECT COUNT(b) FROM Bed b WHERE b.hospital.id = :hospitalId")
    Long countTotalByHospitalId(@Param("hospitalId") Long hospitalId);
    
    List<Bed> findByAssignedDoctorId(Long doctorId);
    
    List<Bed> findByAssignedNurseId(Long nurseId);
}