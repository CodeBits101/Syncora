package com.syncora.servicesimpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.ProjectReqDto;
import com.syncora.dtos.ProjectResponseDto;
import com.syncora.dtos.ProjectSelectionDto;
import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.ProjectStatus;
import com.syncora.exceptions.ApiException;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.DeptRepo;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.services.ProjectService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService{
	
	private final ProjectRepo projectRepo;
	private final ModelMapper modelMapper;
	private final EmployeeRepo employeeRepo;
	

	
	@Override
	public List<ProjectResponseDto> getInProgressProjects() {
		List<ProjectResponseDto> projects = projectRepo.findByProjectStatus(ProjectStatus.IN_PROGRESS).stream()
				.map(project -> { ProjectResponseDto dto = modelMapper.map(project, ProjectResponseDto.class);
				dto.setManagerId(project.getManager().getId());
				return dto;
				}).toList();
		return projects;
	}
	
	@Override
	public List<ProjectResponseDto> getProjectsByStatus(ProjectStatus status) {
		List<ProjectResponseDto> projects = projectRepo.findByProjectStatus(status).stream()
		.map(project -> {ProjectResponseDto dto = modelMapper.map(project, ProjectResponseDto.class);
		dto.setManagerId(project.getManager().getId());
		return dto;
		}).toList();
		return projects;
	}
	
	@Override
	public ApiResponse addProject(ProjectReqDto dto)
	{
		Project project = modelMapper.map(dto, Project.class);
		project.setProjectStatus(ProjectStatus.INPROGRESS);
		Employee manager = employeeRepo.findById(dto.getManagerId()).orElseThrow(()-> new ResourceNotFoundException("employee does not exists with this id")) ;
		project.setManager(manager);
		projectRepo.save(project);
		return new ApiResponse("Project has been created successfully...");
	}
	
	@Override
	public ApiResponse updateProject(Long id, ProjectReqDto dto) {
		Project project = projectRepo.findById(id).orElseThrow(()->
	      new ResourceNotFoundException("Dept does not exist"));
		modelMapper.map(dto, project);
		projectRepo.save(project);
		return new ApiResponse("Project is updated successfully...");
	}
	
	@Override
	public ApiResponse deleteProject(Long id) {
		Project project = projectRepo.findById(id).orElseThrow(()->
	      new ResourceNotFoundException("Project does not exist"));
		projectRepo.deleteById(id);
		return new ApiResponse("Project is deleted successfully...");
	}
	
	@Override
	public List<ProjectStatusCountDto> getProjectByStatusCount()
	{
		List<ProjectStatusCountDto> projectsWithStatusCount = projectRepo.countProjectsByStatus();
		return projectsWithStatusCount.stream().map(types -> modelMapper.map(types, ProjectStatusCountDto.class)).toList();
	}

	@Override
	public List<ProjectSelectionDto> getProjectByManagerId(Long managerId) {
	    return projectRepo.findByManagerIdAndProjectStatus(managerId, ProjectStatus.IN_PROGRESS)
	        .stream()
	        .map(project -> new ProjectSelectionDto(project.getId(), project.getTitle()))
	        .toList();
	}


	

}
