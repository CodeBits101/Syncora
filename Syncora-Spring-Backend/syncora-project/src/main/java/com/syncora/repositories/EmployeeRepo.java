package com.syncora.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.EmployeeType;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
   Optional<Employee> findByEmail(String email) ;
   boolean existsByEmail(String email) ; 
   List<Employee> findByEmpRole(EmployeeType role);
   List<Employee> findByManager_Id(Long managerId);
   List<Employee> findByProjectIsNullAndEmpRoleNotIn(List<EmployeeType> roles);
   List<Employee> findByProject(Project project);

}
