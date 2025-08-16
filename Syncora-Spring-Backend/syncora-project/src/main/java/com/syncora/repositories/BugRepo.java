package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.syncora.dtos.EmployeeStatsDto;
import com.syncora.dtos.ProjectBugsSummaryDto;
import com.syncora.entities.Bug;
import com.syncora.entities.Employee;
import com.syncora.entities.Story;
import com.syncora.enums.TaskStatus;
import com.syncora.entities.Project;



public interface BugRepo extends JpaRepository<Bug, Long> {

    	List<Bug> findByStatusAndProjectId(TaskStatus status, Long projectId);

	List<Bug> findByStory(Story story);
	
	List<Bug> findByStatusAndReportedByAndProject(TaskStatus status, Employee reportedBy, Project project);
	
		
	@Query("""
		    SELECT b
		    FROM Bug b
		    JOIN b.sprint s
		    JOIN s.project p
		    WHERE p.id = :projectId
		      AND s.sprintStatus = com.syncora.enums.SprintStatus.ACTIVE
		      AND b.status = com.syncora.enums.TaskStatus.INPROGRESS
		""")
		List<Bug> findInProgressBugsForActiveSprint(@Param("projectId") Long projectId);
	
	@Query("""
		    SELECT e.id,
		           e.empName,
		           e.doj,
		           SUM(CASE WHEN b.status = com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END),
		           SUM(CASE WHEN b.status <> com.syncora.enums.TaskStatus.DEPLOYMENT THEN 1 ELSE 0 END)
		    FROM Bug b
		    JOIN b.assignedTo e
		    WHERE b.project.id = :projectId
		    GROUP BY e.id, e.empName, e.doj
		""")
		List<Object[]> getBugStatsByProject(@Param("projectId") Long projectId);


}
