package com.syncora.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
   Optional<Employee> findByEmail(String email) ;
   boolean existsByEmail(String email) ; 
}
