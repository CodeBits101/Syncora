package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Sprint;
import com.syncora.enums.SprintStatus;

public interface SprintRepo extends JpaRepository<Sprint, Long> {

	List<Sprint> findByProject_Id(Long ProjectId);

	boolean existsByProjectIdAndSprintStatus(Long projectId, SprintStatus active);
   
}
