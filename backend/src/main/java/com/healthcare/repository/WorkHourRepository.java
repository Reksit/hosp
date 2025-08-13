package com.healthcare.repository;

import com.healthcare.model.WorkHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkHourRepository extends JpaRepository<WorkHour, Long> {
    List<WorkHour> findByUserId(Long userId);
    
    List<WorkHour> findByUserIdAndWorkDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    
    Optional<WorkHour> findByUserIdAndWorkDate(Long userId, LocalDate workDate);
    
    @Query("SELECT SUM(w.actualHours) FROM WorkHour w WHERE w.user.id = :userId AND w.workDate BETWEEN :startDate AND :endDate")
    Double getTotalHoursByUserAndDateRange(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(w.overtimeHours) FROM WorkHour w WHERE w.user.id = :userId AND w.workDate BETWEEN :startDate AND :endDate")
    Double getTotalOvertimeByUserAndDateRange(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}