package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Bug;
import com.syncora.entities.Story;
import com.syncora.enums.TaskStatus;

public interface BugRepo extends JpaRepository<Bug, Long> {

    	List<Bug> findByStatusAndProjectId(TaskStatus status, Long projectId);

    List<Bug> findByStory(Story story);

    List<Bug> findBySprint_Id(Long sprintId);
}
