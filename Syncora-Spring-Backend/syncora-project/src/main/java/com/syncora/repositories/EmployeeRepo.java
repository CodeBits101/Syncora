package com.syncora.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Employee;
import com.syncora.enums.EmployeeType;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
   Optional<Employee> findByEmail(String email) ;
   boolean existsByEmail(String email) ; 
   List<Employee> findByEmpRole(EmployeeType role);
}
