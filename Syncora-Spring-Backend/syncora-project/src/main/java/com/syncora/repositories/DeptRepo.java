package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Department;

public interface DeptRepo extends JpaRepository<Department, Long> {
   
}
