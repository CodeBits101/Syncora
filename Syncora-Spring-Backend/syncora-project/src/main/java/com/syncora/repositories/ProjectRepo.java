package com.syncora.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.syncora.dtos.ProjectResponseDto;
import com.syncora.dtos.ProjectSelectionDto;
import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.ProjectStatus;

public interface ProjectRepo extends JpaRepository<Project, Long>{
	List<Project> findByProjectStatus(ProjectStatus status);
	List<Project> findByManagerAndProjectStatus(Employee manager, ProjectStatus status);
	
	@Query("SELECT new com.syncora.dtos.ProjectStatusCountDto(p.projectStatus, COUNT(p)) " +
		       "FROM Project p " +
		       "WHERE p.manager.id = :managerId " +
		       "GROUP BY p.projectStatus")
	List<ProjectStatusCountDto> countProjectsByStatus(@Param("managerId")Long managerId);
	@Query("SELECT new com.syncora.dtos.ProjectStatusCountDto(p.projectStatus, COUNT(p)) " +
		       "FROM Project p " +
		       "GROUP BY p.projectStatus")
	List<ProjectStatusCountDto> countProjectsByStatus();
//	List<ProjectSelectionDto> findByManagerAndProjectStatus(Long managerId, ProjectStatus inProgress);
	List<Project> findByManagerIdAndProjectStatus(Long managerId, ProjectStatus inProgress);
}