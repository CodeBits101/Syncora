package com.syncora.servicesimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SprintRequestDto;
import com.syncora.dtos.SprintResponseDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.enums.SprintStatus;
import com.syncora.exceptions.ApiException;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;
import com.syncora.services.SprintService;

import lombok.AllArgsConstructor;



@Service
@Transactional

@AllArgsConstructor
public class SprintServiceImpl implements SprintService {
     private final SprintRepo sprintRepo ;
     private final ProjectRepo projectRepo;
     private final EmployeeRepo empRepo;
     private ModelMapper modelMapper;

	@Override
	public List<SprintResponseDto> getAllSprints() {
		List<Sprint> sprints = sprintRepo.findAll();

		 if (sprints.isEmpty()) {
		        throw new ResourceNotFoundException("No Sprints Found ");
		    }
		 return sprints.stream()
	               .map(sprint -> modelMapper.map(sprint, SprintResponseDto.class))
	               .collect(Collectors.toList());
	}

	@Override
	public List<SprintResponseDto> getSprintByProjectId(Long id) {
		List<Sprint> sprints = sprintRepo.findByProject_Id(id);
		if (sprints.isEmpty()) {
	        throw new ResourceNotFoundException("No Sprints Found ");
	    }
	 return sprints.stream()
               .map(sprint -> modelMapper.map(sprint, SprintResponseDto.class))
               .collect(Collectors.toList());
	}

	@Override
	public ApiResponse addSprint(SprintRequestDto requestDto) {
		// TODO Auto-generated method stub
		Project project = projectRepo.findById(requestDto.getProjectId()).orElseThrow(()-> new ResourceNotFoundException("Project Not Found"));
		
		Employee manager = empRepo.findById(requestDto.getManagerId()).orElseThrow(()-> new ResourceNotFoundException("Manager not found"));
		
		Sprint sprint = new Sprint();
		
		sprint.setSprintName(requestDto.getSprintName());
		sprint.setDescription(requestDto.getDescription());
		sprint.setActualStartDate(requestDto.getStartDate());
		sprint.setActualEndDate(requestDto.getEndDate());
		sprint.setManager(manager);
		sprint.setProject(project);
		
		sprint.setSprintStatus(SprintStatus.BACKLOG);
		
		Sprint saved = sprintRepo.save(sprint);
		
		return new ApiResponse("Sprint Created");
	}

	@Override
	public ApiResponse updateSprint(SprintRequestDto requestDto, Long id) {
		// TODO Auto-generated method stub
//		checking sprint available or not
		Sprint sprint = sprintRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sprint does not exist."));
		
		if(sprint.getSprintStatus() == SprintStatus.ACTIVE || sprint.getSprintStatus() == SprintStatus.COMPLETED)
			throw new ApiException("Active or Completed Sprints cannot be edited.");
		
		if(sprint.getSprintStatus() == SprintStatus.BACKLOG)
		{
			sprint.setSprintName(requestDto.getSprintName());
			sprint.setDescription(requestDto.getDescription());
			sprint.setActualStartDate(requestDto.getStartDate());
			sprint.setActualEndDate(requestDto.getEndDate());
		}
		sprintRepo.save(sprint);
		return new ApiResponse("Sprint Updated Successfully!");
		
		
	}

	@Override
	public ApiResponse deleteSprint(Long id) {
	    Sprint sprint = sprintRepo.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Sprint does not exist!"));

	    SprintStatus status = sprint.getSprintStatus();

	    if (status == SprintStatus.ACTIVE || status == SprintStatus.COMPLETED) {
	        throw new ApiException("Cannot delete Active or Completed sprints.");
	    }

	    sprintRepo.delete(sprint);
	    return new ApiResponse("Sprint deleted successfully.");
	}

}
