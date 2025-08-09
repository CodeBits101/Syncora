package com.syncora.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Bug;
import com.syncora.entities.Employee;
import com.syncora.entities.Story;
import com.syncora.enums.TaskStatus;
import com.syncora.entities.Project;



public interface BugRepo extends JpaRepository<Bug, Long> {

	List<Bug> findBySprintIsNullAndStoryIsNull();

	List<Bug> findByStory(Story story);
	
	List<Bug> findByStatusAndReportedByAndProject(TaskStatus status, Employee reportedBy, Project project);
}
