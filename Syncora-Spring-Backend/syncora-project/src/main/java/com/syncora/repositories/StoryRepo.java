package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Story;
import com.syncora.entities.Project;
import com.syncora.entities.Employee;
import com.syncora.entities.Sprint;
import com.syncora.enums.TaskStatus;



public interface StoryRepo extends JpaRepository<Story, Long> {

	List<Story> findByCurrentSprintIsNull();
	List<Story> findAllByProject_Id(Long projectId);
	List<Story> findByProjectAndCurrentSprintAndCreatedBy
	(Project project, Sprint currentSprint, Employee createdBy);
	List<Story> findByStoryStatusAndCreatedByAndProject
	(TaskStatus storyStatus, Employee createdBy, Project project);
}