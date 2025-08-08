package com.syncora.servicesimpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.TaskReqDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.enums.TaskStatus;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;
import com.syncora.repositories.StoryRepo;
import com.syncora.repositories.TaskRepo;
import com.syncora.services.TaskRespDto;
import com.syncora.services.TaskService;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {
   private final TaskRepo taskRepo ; 
   private final ProjectRepo projectRepo; 
   private final StoryRepo  storyRepo; 
   private final SprintRepo sprintRepo; 
   private final ModelMapper modelMapper ;
   private final EmployeeRepo empRepo ; 
   
   
@Override
public ApiResponse createTask(TaskReqDto dto,Long id) {
	Employee emp  = empRepo.findById(id)
			.orElseThrow(()-> new ResourceNotFoundException("employee does not exists with this id")) ; 
	Employee assignedToEmp  = empRepo.findById(dto.getAssignedToId()).
			orElseThrow(()-> new ResourceNotFoundException("employee does not exist to assign the task")) ; 
	
	
	 Project project = projectRepo.findById(dto.getProjectId())
			 .orElseThrow(()-> new ResourceNotFoundException("Project Does not exist")) ; 
	 
	
	
	Task createdTask= modelMapper.map(dto, Task.class); 
	createdTask.setAssignedTo(assignedToEmp);
	createdTask.setCreatedBy(emp);
	createdTask.setProject(project);
	if(dto.getStatus() == null) {
		createdTask.setStatus(TaskStatus.BACKLOG);
	}
	
	if(dto.getSprintId() != null) {
		Sprint sprint = sprintRepo.findById(dto.getSprintId())
				 .orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist")) ;
		createdTask.setSprint(sprint);
	}
	
	if(dto.getStoryId() != null) {
		Story story = storyRepo.findById(dto.getStoryId())
				 .orElseThrow(()-> new ResourceNotFoundException("Story Does not exist")) ;
		createdTask.setStory(story);
		createdTask.setStatus(TaskStatus.TODO);
		if(story.getCurrentSprint() != null) {
			Sprint sprint = sprintRepo.findById(story.getCurrentSprint().getId()).orElseThrow(()->
			new ResourceNotFoundException("Sprint does not exist by this id")) ;  
			createdTask.setSprint(sprint);
		}
	}
	
	taskRepo.save(createdTask) ; 
	
	return new ApiResponse("Task Created successfully");
}

@Override
public List<BacklogItemDto> getBacklogTasks(Long projectId) {
	List<Task> tasks = taskRepo.findByStatusAndProjectId(TaskStatus.BACKLOG, projectId);
	return tasks.stream()
			.map(task -> {
				String assignedToName = task.getAssignedTo() != null ? 
					task.getAssignedTo().getEmpName() : 
					"Unassigned";
				return new BacklogItemDto(
					"TASK",
					task.getTitle(),
					task.getPriority(),
					assignedToName,
					task.getId()
				);
			})
			.collect(Collectors.toList());
}


@Override
public ApiResponse deleteTask(Long id) {
	taskRepo.deleteById(id); 
	return new ApiResponse("Task Deleted successfully");
}


@Override
public ApiResponse updateTask(TaskReqDto dto, Long id) {
    Task task  = taskRepo.findById(id).
    		orElseThrow(()->new ResourceNotFoundException("task does not exist")) ;  
    
    Employee assignedToEmp  = empRepo.findById(dto.getAssignedToId()).
			orElseThrow(()-> new ResourceNotFoundException("employee does not exist to assign the task")) ;
    
    modelMapper.map(dto, task) ; 
    
    if(dto.getStatus() == null) {
		task.setStatus(TaskStatus.BACKLOG);
	}
	
	if(dto.getSprintId() != null) {
		Sprint sprint = sprintRepo.findById(dto.getSprintId())
				 .orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist")) ;
		task.setSprint(sprint);
	}
	
	if(dto.getStoryId() != null) {
		Story story = storyRepo.findById(dto.getStoryId())
				 .orElseThrow(()-> new ResourceNotFoundException("Story Does not exist")) ;
		task.setStory(story);
		task.setStatus(TaskStatus.TODO);
		if(story.getCurrentSprint() != null) {
			Sprint sprint = sprintRepo.findById(story.getCurrentSprint().getId()).orElseThrow(()->
			new ResourceNotFoundException("Sprint does not exist by this id")) ;  
			task.setSprint(sprint);
		}
	}
	
    task.setAssignedTo(assignedToEmp);
    taskRepo.save(task) ; 
	return new ApiResponse("task updated successfully");
}


@Override
public ApiResponse changeStatus(TaskStatus changestatus, Long id) {
	Task task  = taskRepo.findById(id).
    		orElseThrow(()->new ResourceNotFoundException("task does not exist")) ;
	
	task.setStatus(changestatus);
	taskRepo.save(task) ; 
	return new ApiResponse("task status updated successfully");
}


@Override
public List<TaskRespDto> getTaskByStatus(Long id) {
	Story story  = storyRepo.findById(id)
			.orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist")) ;
	List<TaskRespDto> taskList = taskRepo.findByStory(story).stream(). 
			map(task->{
			  TaskRespDto dto  =  modelMapper.map(task, TaskRespDto.class) ; 
			  dto.setAssignedTo(task.getAssignedTo().getEmpName()) ; 
			  dto.setCreatedBy(task.getCreatedBy().getEmpName()) ; 
			  dto.setProjectName(task.getProject().getTitle()) ; 
			  dto.setStoryName(task.getStory().getTitle()) ; 
			  if(task.getSprint() != null) {
				  dto.setSprintName(task.getSprint().getSprintName()) ; 
			  }
			  return dto ; 
			}).toList();
	return taskList;

} 
   
   
}
