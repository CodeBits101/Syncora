package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.enums.TaskStatus;
import com.syncora.dtos.EmployeeStatsDto;
import com.syncora.dtos.ProjectBugsSummaryDto;
import com.syncora.dtos.ProjectTasksSummaryDto;
import com.syncora.dtos.SprintTaskCountDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;



import com.syncora.enums.TaskStatus;

public interface TaskRepo extends JpaRepository<Task, Long> {


    	List<Task> findByStatusAndProjectId(TaskStatus status, Long projectId);

   List<Task> findByStory(Story story);
   
   List<Task> findByStatusAndCreatedByAndProject(TaskStatus status, Employee createdBy, Project project);
   

   List<Task> findBySprint_Id(Long sprintId);
   
   
   @Query("""
		    SELECT new com.syncora.dtos.SprintTaskCountDto(
		        COALESCE(SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.BACKLOG THEN 1 ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.TODO THEN 1 ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.INPROGRESS THEN 1 ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.TESTING THEN 1 ELSE 0 END), 0),
		        COALESCE(SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END), 0)
		    )
		    FROM Task t
		    JOIN t.sprint s
		    JOIN s.project p
		    WHERE p.id = :projectId
		      AND s.sprintStatus = com.syncora.enums.SprintStatus.ACTIVE
		""")
		SprintTaskCountDto getTaskCountsByStatusForActiveSprint(@Param("projectId") Long projectId);
   
   		@Query("""
		    SELECT t
		    FROM Task t
		    JOIN t.sprint s
		    JOIN s.project p
		    WHERE p.id = :projectId
		      AND s.sprintStatus = com.syncora.enums.SprintStatus.ACTIVE
		      AND t.status = com.syncora.enums.TaskStatus.INPROGRESS
		""")
		List<Task> findInProgressTasksForActiveSprint(@Param("projectId") Long projectId);

   		@Query("""
   			    SELECT e.id,
   			           e.empName,
   			           e.doj,
   			           SUM(CASE WHEN t.status = com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END),
   			           SUM(CASE WHEN t.status <> com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END)
   			    FROM Task t
   			    JOIN t.assignedTo e
   			    WHERE t.project.id = :projectId
   			    GROUP BY e.id, e.empName, e.doj
   			""")
   			List<Object[]> getTaskStatsByProject(@Param("projectId") Long projectId);


}
