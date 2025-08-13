package com.healthcare.repository;

import com.healthcare.model.Role;
import com.healthcare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    Optional<User> findByVerificationToken(String token);
    
    Boolean existsByEmail(String email);
    
    List<User> findByHospitalIdAndRole(Long hospitalId, Role role);
    
    @Query("SELECT u FROM User u WHERE u.hospital.id = :hospitalId AND u.role IN :roles")
    List<User> findByHospitalIdAndRoleIn(@Param("hospitalId") Long hospitalId, @Param("roles") List<Role> roles);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.hospital.id = :hospitalId AND u.role = :role")
    Long countByHospitalIdAndRole(@Param("hospitalId") Long hospitalId, @Param("role") Role role);
}