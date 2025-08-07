package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.ProjectStatus;

public interface ProjectRepo extends JpaRepository<Project, Long>{
	List<Project> findByProjectStatus(ProjectStatus status);
	List<Project> findByManagerAndProjectStatus(Employee manager, ProjectStatus status);
	
	@Query("SELECT new com.syncora.dtos.ProjectStatusCountDto(p.projectStatus, COUNT(p)) " +
		       "FROM Project p GROUP BY p.projectStatus")
	List<ProjectStatusCountDto> countProjectsByStatus();
}