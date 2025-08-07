package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Sprint;

public interface SprintRepo extends JpaRepository<Sprint, Long> {
   
}
