package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BackLogResponseDto;
import com.syncora.dtos.ProjectReqDto;
import com.syncora.dtos.ProjectResponseDto;
import com.syncora.dtos.ProjectSelectionDto;
import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.enums.ProjectStatus;

public interface ProjectService {
	
	List<ProjectResponseDto> getInProgressProjects();
	
	List<ProjectResponseDto> getProjectsByStatus(ProjectStatus status);
	
	ApiResponse addProject(ProjectReqDto dto);
	
	ApiResponse updateProject(Long id,ProjectReqDto dto);
	
	ApiResponse deleteProject(Long id);
	
	List<ProjectStatusCountDto> getProjectByStatusCount();

	List<ProjectSelectionDto> getProjectByManagerId(Long managerId);

	BackLogResponseDto getBackLogItems(Long id ,Long managerId);
	
	

}