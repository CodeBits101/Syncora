package com.syncora.servicesimpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BugRespDto;
import com.syncora.dtos.SprintRequestDto;
import com.syncora.dtos.SprintResponseDto;
import com.syncora.dtos.TaskResponseDto;
import com.syncora.entities.Bug;
import com.syncora.dtos.SprintItemsRespDto;
import com.syncora.dtos.BugRespDto;
import com.syncora.services.TaskRespDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.entities.Story;
import com.syncora.enums.SprintStatus;
import com.syncora.exceptions.ApiException;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;
import com.syncora.repositories.StoryRepo;
import com.syncora.dtos.StoryResponseDto;
import com.syncora.services.SprintService;

import lombok.AllArgsConstructor;



@Service
@Transactional

@AllArgsConstructor
public class SprintServiceImpl implements SprintService {
     private final SprintRepo sprintRepo ;
     private final ProjectRepo projectRepo;
     private final EmployeeRepo empRepo;
     private final StoryRepo storyRepo;
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
    public SprintItemsRespDto getSprintItems(Long sprintId) {
        Sprint sprint = sprintRepo.findById(sprintId)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint does not exist."));

        SprintItemsRespDto resp = new SprintItemsRespDto();
        resp.setSprintId(sprint.getId());

        // Bugs
        List<BugRespDto> bugDtos = sprint.getBugs().stream()
                .map(b -> modelMapper.map(b, BugRespDto.class))
                .collect(Collectors.toList());
        resp.setBugs(bugDtos);

        // Tasks
        List<TaskRespDto> taskDtos = sprint.getTasks().stream()
                .map(t -> modelMapper.map(t, TaskRespDto.class))
                .collect(Collectors.toList());
        resp.setTasks(taskDtos);

        // Stories: include both many-to-many and currentSprint associated stories
        List<Story> storyList = sprint.getStories().stream().collect(Collectors.toList());
        storyList.addAll(storyRepo.findByCurrentSprint_Id(sprintId));

        List<StoryResponseDto> storyDtos = storyList.stream()
                .distinct()
                .map(st -> modelMapper.map(st, StoryResponseDto.class))
                .collect(Collectors.toList());
        resp.setStories(storyDtos);

        return resp;
    }

	@Override
	public List<SprintResponseDto> getSprintByProjectId(Long id) {
		List<Sprint> sprints = sprintRepo.findByProject_Id(id);
		if (sprints.isEmpty()) {
	        throw new ResourceNotFoundException("No Sprints Found ");
		}
		
		return sprints.stream()
			    .map(sprint -> {
			        SprintResponseDto dto = new SprintResponseDto();
			        dto.setId(sprint.getId());
			        dto.setSprintName(sprint.getSprintName());
			        dto.setDescription(sprint.getDescription());
			        dto.setStartDate(sprint.getActualStartDate());
			        dto.setEndDate(sprint.getActualEndDate());

			        if (sprint.getProject() != null)
			            dto.setProjectId(sprint.getProject().getId());
			        if (sprint.getManager() != null)
			            dto.setManagerId(sprint.getManager().getId());

			        dto.setSprintStatus(sprint.getSprintStatus());
			        dto.setStoryIds(sprint.getStories()
			            .stream()
			            .map(Story::getId)
			            .collect(Collectors.toSet())
			        );
			        
			        dto.setTasks(
			        	    sprint.getTasks()
			        	        .stream()
			        	        .map(task -> {
			        	            TaskRespDto t = new TaskRespDto();
			        	            t.setId(task.getId());
			        	            t.setTitle(task.getTitle());
			        	            t.setStatus(task.getStatus());
			        	            t.setPriority(task.getPriority());
			        	            t.setDescription(task.getDescription());
			        	            t.setStartDate(task.getStartDate());
			        	            t.setEndDate(task.getEndDate());
			        	            
			        	            if (task.getAssignedTo() != null) {
			        	                t.setAssignedTo(task.getAssignedTo().getEmpName());
			        	                t.setAssignedToId(task.getAssignedTo().getId());
			        	                t.setAssignToEmail(task.getAssignedTo().getEmail()) ; 
			        	            }
			        	            if (task.getCreatedBy() != null) {
			        	                t.setCreatedBy(task.getCreatedBy().getEmpName());
			        	            }
			        	            if (task.getProject() != null) {
			        	                t.setProjectName(task.getProject().getTitle());
			        	                t.setProjectId(task.getProject().getId());
			        	            }
			        	            if (task.getSprint() != null) {
			        	                t.setSprintName(task.getSprint().getSprintName());
			        	            }
			        	            if (task.getStory() != null) {
			        	                t.setStoryName(task.getStory().getTitle());
			        	            }
			        	            
			        	            t.setDebugCount(task.getDebugCount());
			        	            t.setStoryPoint(task.getStoryPoint());
			        	            t.setDebugFlag(task.isDebugFlag());
			        	            t.setTestingFlag(task.isTestingFlag());

			        	            return t;
			        	        })
			        	        .collect(Collectors.toList())
			        	);


			        dto.setBugs(
			        	    sprint.getBugs()
			        	        .stream()
			        	        .map(bug -> {
			        	            BugRespDto b = new BugRespDto();
			        	            b.setId(bug.getId());
			        	            b.setTitle(bug.getTitle());
			        	            b.setPriority(bug.getPriority());
			        	            b.setStatus(bug.getStatus());
			        	            b.setDescription(bug.getDescription());
			        	            b.setStartDate(bug.getStartDate());
			        	            b.setEndDate(bug.getEndDate());

			        	            if (bug.getAssignedTo() != null) {
			        	                b.setAssignedTo(bug.getAssignedTo().getEmpName());
			        	                b.setAssignedToId(bug.getAssignedTo().getId());
			        	                b.setAssignToEmail(bug.getAssignedTo().getEmail());
			        	            }
			        	            if (bug.getReportedBy() != null) {
			        	                b.setReportedBy(bug.getReportedBy().getEmpName());
			        	            }
			        	            if (bug.getProject() != null) {
			        	                b.setProjectName(bug.getProject().getTitle());
			        	                b.setProjectId(bug.getProject().getId());
			        	            }
			        	            if (bug.getSprint() != null) {
			        	                b.setSprintName(bug.getSprint().getSprintName());
			        	            }
			        	            if (bug.getStory() != null) {
			        	                b.setStoryName(bug.getStory().getTitle());
//			        	                b.setStoryPoint(bug.getStory().getStoryPoint());
			        	            }

			        	            b.setReopenCount(bug.getReopenCount());

			        	            return b;
			        	        })
			        	        .collect(Collectors.toList())
			        	);
			        return dto;
			    })
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
		
        sprintRepo.save(sprint);
        
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
// server side validation
	    if (status == SprintStatus.ACTIVE || status == SprintStatus.COMPLETED) {
	        throw new ApiException("Cannot delete Active or Completed sprints.");
	    }

	    sprintRepo.delete(sprint);
	    return new ApiResponse("Sprint deleted successfully.");
	}

	@Override
	public ApiResponse startSprint(Long id, Long projectId) {
		//server side validation
		if(sprintRepo.existsByProjectIdAndSprintStatus(projectId, SprintStatus.ACTIVE))
		{
			throw new ApiException("Projet Already has an Active Sprint");
		}
		Sprint sprint = sprintRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist"));
		sprint.setSprintStatus(SprintStatus.ACTIVE);
		sprint.setActualStartDate(LocalDateTime.now());
		return new ApiResponse("Sprint Started");
	}

	@Override
	public ApiResponse completeSprint(Long id) {
		Sprint sprint = sprintRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exists"));
		sprint.setSprintStatus(SprintStatus.COMPLETED);
		sprint.setActualEndDate(LocalDateTime.now());
		return new ApiResponse("Sprint Completed.");
	}

	
}
