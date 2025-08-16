package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.syncora.entities.Story;
import com.syncora.entities.Project;
import com.syncora.dtos.ProjectStoriesSummaryDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Sprint;
import com.syncora.enums.TaskStatus;


import com.syncora.enums.TaskStatus;

public interface StoryRepo extends JpaRepository<Story, Long> {


	List<Story> findAllByProject_Id(Long projectId);
	List<Story> findByProjectAndCurrentSprintAndCreatedBy
	(Project project, Sprint currentSprint, Employee createdBy);
	List<Story> findByStoryStatusAndCreatedByAndProject
	(TaskStatus storyStatus, Employee createdBy, Project project);

    List<Story> findByStoryStatusAndProjectId(TaskStatus storyStatus, Long projectId);

    List<Story> findBySprints_Id(Long sprintId);
    List<Story> findByCurrentSprint_Id(Long sprintId);

    
    @Query("""
    	    SELECT 
    	        (SUM(CASE WHEN s.storyStatus = com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END) * 1.0 
    	         / COUNT(s)) * 100
    	    FROM Story s
    	    WHERE s.project.id = :projectId
    	""")
    	Double getProjectStoryProgress(@Param("projectId") Long projectId);

}