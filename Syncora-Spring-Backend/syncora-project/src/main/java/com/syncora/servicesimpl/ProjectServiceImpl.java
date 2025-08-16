package com.syncora.servicesimpl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.ArrayList;
import java.util.HashMap;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BackLogResponseDto;
import com.syncora.dtos.BugRespDto;
import com.syncora.dtos.CombinedReportDto;
import com.syncora.dtos.EmployeeStatsDto;
import com.syncora.dtos.ProjectDetailsRespDto;
import com.syncora.dtos.ProjectReqDto;
import com.syncora.dtos.ProjectEditReqDto;
import com.syncora.dtos.ProjectResponseDto;
import com.syncora.dtos.ProjectSelectionDto;
import com.syncora.dtos.ProjectStatusCountDto;
import com.syncora.dtos.StoryResponseDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.EmployeeType;
import com.syncora.enums.ProjectStatus;
import com.syncora.enums.TaskStatus;
import com.syncora.exceptions.ApiException;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.*;
import com.syncora.services.ProjectService;
import com.syncora.services.TaskRespDto;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService{

    private final SprintRepo sprintRepo;
	
	private final ProjectRepo projectRepo;
	private final ModelMapper modelMapper;
	private final EmployeeRepo employeeRepo;
	private final StoryRepo storyRepo;  
	private final BugRepo bugRepo;  
	private final TaskRepo taskRepo;
	private final ProjectReportRepository reportRepo;
	

	private ProjectResponseDto mapToProjectResponseDto(Project project) {
	    ProjectResponseDto dto = modelMapper.map(project, ProjectResponseDto.class);
	    dto.setManagerId(project.getManager().getId());
	    dto.setManagerName(project.getManager().getEmpName());
	    return dto;
	}
	
	@Override
	public List<ProjectResponseDto> getInProgressProjects(Long empId) {
	    Employee emp = employeeRepo.findById(empId)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));

	    List<Project> projects;

	    switch (emp.getEmpRole()) {
	        case ROLE_MANAGER -> 
	            projects = projectRepo.findByManagerAndProjectStatus(emp, ProjectStatus.INPROGRESS);
	        case ROLE_ADMIN -> 
	            projects = projectRepo.findByProjectStatus(ProjectStatus.INPROGRESS);
	        default -> 
	            throw new ApiException("Unauthorized request");
	    }

	    return projects.stream()
	            .map(this::mapToProjectResponseDto)
	            .toList();
	}

	
	@Override
	public List<ProjectResponseDto> getProjectsByStatus(Long empId, ProjectStatus status) {
	    Employee employee = employeeRepo.findById(empId)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));

	    List<Project> projects;

	    if (employee.getEmpRole() == EmployeeType.ROLE_ADMIN) {
	        projects = projectRepo.findByProjectStatus(status);
	    } 
	    else if (employee.getEmpRole() == EmployeeType.ROLE_MANAGER) {
	        projects = projectRepo.findByManagerAndProjectStatus(employee, status);
	    } 
	    else {
	        throw new ApiException("Unauthorized request");
	    }

	    return projects.stream()
	            .map(this::mapToProjectResponseDto)
	            .toList();
	}
	
	@Override
	public ApiResponse addProject(ProjectReqDto dto)
	{
		Project project = modelMapper.map(dto, Project.class);
		project.setProjectStatus(ProjectStatus.INPROGRESS);
		Employee manager = employeeRepo.findById(dto.getManagerId()).orElseThrow(()-> new ResourceNotFoundException("employee does not exists with this id")) ;
		project.setManager(manager);
		  if (dto.getEmployeeIds() != null && !dto.getEmployeeIds().isEmpty()) {
		        List<Employee> employees = employeeRepo.findAllById(dto.getEmployeeIds());
		        for (Employee emp : employees) {
		            project.addEmployee(emp);
		        }
		    }
		projectRepo.save(project);
		return new ApiResponse("Project has been created successfully...");
	}
	
	@Override
	public ApiResponse updateProject(Long id, ProjectEditReqDto dto) {
		Project project = projectRepo.findById(id).orElseThrow(()->
	      new ResourceNotFoundException("Project does not exist"));
			modelMapper.map(dto, project);
		  if (dto.getEmployeesToAdd() != null && !dto.getEmployeesToAdd().isEmpty()) {
		        List<Employee> employees = employeeRepo.findAllById(dto.getEmployeesToAdd());
		        for (Employee emp : employees) {
		            project.addEmployee(emp);
		        }
		    }
		  
		  if (dto.getEmployeesToRemove() != null && !dto.getEmployeesToRemove().isEmpty()) {
		        List<Employee> employees = employeeRepo.findAllById(dto.getEmployeesToRemove());
		        for (Employee emp : employees) {
		            project.removeEmployee(emp);
		        }
		    }		  
		projectRepo.save(project);
		return new ApiResponse("Project is updated successfully...");
	}
	
	@Override
	public ApiResponse deleteProject(Long id) {
		Project project = projectRepo.findById(id).orElseThrow(()->
	      new ResourceNotFoundException("Project does not exist"));
		
		if (project.getEmpList() != null && !project.getEmpList().isEmpty()) {
		    List<Employee> employees = project.getEmpList();
		    for (Employee emp : new ArrayList<>(employees)) {
		        project.removeEmployee(emp);
		        employeeRepo.save(emp);
		    }
		}
		projectRepo.deleteById(id);
		return new ApiResponse("Project is deleted successfully...");
	}
	
	@Override
	public List<ProjectStatusCountDto> getProjectByStatusCount(Long empId) {
	    Employee employee = employeeRepo.findById(empId)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));

	    List<ProjectStatusCountDto> projectsWithStatusCount;

	    if (employee.getEmpRole() == EmployeeType.ROLE_ADMIN) {
	        projectsWithStatusCount = projectRepo.countProjectsByStatus();
	    } else if (employee.getEmpRole() == EmployeeType.ROLE_MANAGER) {
	        projectsWithStatusCount = projectRepo.countProjectsByStatus(empId);
	    } else {
	        throw new ApiException("Unauthorized request");
	    }

	    return projectsWithStatusCount.stream()
	            .map(dto -> modelMapper.map(dto, ProjectStatusCountDto.class))
	            .toList();
	}
	
	@Override
	public List<ProjectSelectionDto> getProjectByManagerId(Long managerId) {
	    return projectRepo.findByManagerIdAndProjectStatus(managerId, ProjectStatus.INPROGRESS)
	        .stream()
	        .map(project -> new ProjectSelectionDto(project.getId(), project.getTitle()))
	        .toList();
	}

	@Override
	public BackLogResponseDto getBackLogItems(Long id,Long managerId) {
		Employee manager  = employeeRepo.findById(managerId)
				.orElseThrow(()->new ResourceNotFoundException("Employee does not exist")) ;
		
		Project project  = projectRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Project does not exist")) ;
		
		
	    List<StoryResponseDto> storyDTOs = storyRepo.findByStoryStatusAndCreatedByAndProject(TaskStatus.BACKLOG, manager ,project)
	            .stream()
	            .map(s -> new StoryResponseDto(s.getId() ,
	            		s.getCreatedTimeStamp(),s.getUpdatedTimeStamp(),
	            		s.getTitle(),s.getDescription(),s.getProject().getId(),s.getStartDate()
	            		,s.getEndDate(),s.getActualStartDate(),s.getActualEndDate()))
	            .toList();
	    
	
	    
	    List<TaskRespDto> taskDTOs = taskRepo.findByStatusAndCreatedByAndProject(TaskStatus.BACKLOG,manager,project)
	            .stream()
	            .map(t -> modelMapper.map(t, TaskRespDto.class))
	            .toList();
	    
	    List<BugRespDto> bugDTOs = bugRepo.findByStatusAndReportedByAndProject(TaskStatus.BACKLOG,manager,project)
	            .stream()
	            .map(b -> modelMapper.map(b, BugRespDto.class))
	            .toList();
		
		return new BackLogResponseDto(storyDTOs,bugDTOs,taskDTOs);
	}
	
	
    @Override
    public ProjectDetailsRespDto getProjectDetails(Long id, Long empId) {
        employeeRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist"));
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist"));

        ProjectDetailsRespDto detailsDto = new ProjectDetailsRespDto();
        detailsDto.setProject(mapToProjectResponseDto(project));

        CombinedReportDto aggregated = reportRepo.getSummaryData(id);
        detailsDto.setSprintCounts(aggregated.getSprintCounts());
        detailsDto.setSummary(aggregated.getSummary());

        detailsDto.setCurrentSprintSummary(taskRepo.getTaskCountsByStatusForActiveSprint(id));

        List<TaskRespDto> inProgressTasks = Stream.concat(
                taskRepo.findInProgressTasksForActiveSprint(id).stream()
                        .map(t -> modelMapper.map(t, TaskRespDto.class)),
                bugRepo.findInProgressBugsForActiveSprint(id).stream()
                        .map(b -> modelMapper.map(b, TaskRespDto.class))
        ).collect(Collectors.toList());
        detailsDto.setInProgressTasks(inProgressTasks);

        detailsDto.setSprintDetails(sprintRepo.findSprintDetailsByProjectId(id));
        detailsDto.setProjectProgress(Optional.ofNullable(storyRepo.getProjectStoryProgress(id)).orElse(0.0));
        detailsDto.setEmpStats(getEmployeeStats(id));

        return detailsDto;
    }

    private List<EmployeeStatsDto> getEmployeeStats(Long projectId) {
        Map<Long, EmployeeStatsDto> statsMap = new HashMap<>();

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist"));

        List<Employee> employees = employeeRepo.findByProject(project);
        for (Employee emp : employees) {
            EmployeeStatsDto dto = new EmployeeStatsDto();
            dto.setEmpId(emp.getId());
            dto.setEmpName(emp.getEmpName());
            dto.setDoj(emp.getDoj());
            dto.setCompletedCount(0L);
            dto.setPendingCount(0L);
            statsMap.put(emp.getId(), dto);
        }

        for (Object[] row : taskRepo.getTaskStatsByProject(projectId)) {
            Long empId = (Long) row[0];
            EmployeeStatsDto dto = statsMap.get(empId);
            if (dto != null) {
                dto.setCompletedCount(((Number) row[3]).longValue());
                dto.setPendingCount(((Number) row[4]).longValue());
            }
        }

        for (Object[] row : bugRepo.getBugStatsByProject(projectId)) {
            Long empId = (Long) row[0];
            EmployeeStatsDto dto = statsMap.get(empId);
            if (dto != null) {
                dto.setCompletedCount(dto.getCompletedCount() + ((Number) row[3]).longValue());
                dto.setPendingCount(dto.getPendingCount() + ((Number) row[4]).longValue());
            }
        }

        statsMap.values().forEach(dto -> {
            long total = dto.getCompletedCount() + dto.getPendingCount();
            dto.setPerformance(total > 0 ? Math.round(dto.getCompletedCount() * 100.0 / total) : 0.0);
        });

        return new ArrayList<>(statsMap.values());
    }

}
