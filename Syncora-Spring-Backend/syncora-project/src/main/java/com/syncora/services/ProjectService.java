package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BackLogResponseDto;
import com.syncora.dtos.ProjectReqDto;
import com.syncora.dtos.ProjectResponseDto;
import com.syncora.dtos.ProjectEditReqDto;
import com.syncora.dtos.ProjectSelectionDto;
import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.enums.ProjectStatus;

public interface ProjectService {
	
	List<ProjectResponseDto> getInProgressProjects(Long managerId);
	
	List<ProjectResponseDto> getProjectsByStatus(Long managerId, ProjectStatus status);
	
	ApiResponse addProject(ProjectReqDto dto);
	
	ApiResponse updateProject(Long id,ProjectEditReqDto dto);
	
	ApiResponse deleteProject(Long id);
	
	List<ProjectStatusCountDto> getProjectByStatusCount(Long managerId);

	List<ProjectSelectionDto> getProjectByManagerId(Long managerId);

	BackLogResponseDto getBackLogItems(Long id ,Long managerId);
	
	

}