package com.syncora.servicesimpl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.TaskReqDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Task;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.TaskRepo;
import com.syncora.services.TaskService;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {
   private final TaskRepo taskRepo ; 
   private final ModelMapper modelMapper ;
   private final EmployeeRepo empRepo ; 
   
   
@Override
public ApiResponse createTask(TaskReqDto dto,Long id) {
	Employee emp  = empRepo.findById(id)
			.orElseThrow(()-> new ResourceNotFoundException("employee does not exists with this id")) ; 
	Employee assignedToEmp  = empRepo.findById(dto.getAssignedToId()).
			orElseThrow(()-> new ResourceNotFoundException("employee does not exist to assign the task")) ; 
	
	
	 
	
	
	Task createdTask= modelMapper.map(dto, Task.class); 
	createdTask.setAssignedTo(assignedToEmp);
	createdTask.setAssignedBy(emp);
	
	taskRepo.save(createdTask) ; 
	
	return new ApiResponse("Task Created successfully");
}

@Override
public List<BacklogItemDto> getBacklogTasks() {
	List<Task> tasks = taskRepo.findBySprintIsNullAndStoryIsNull();
	return tasks.stream()
			.map(task -> {
				String assignedToName = task.getAssignedTo() != null ? 
					task.getAssignedTo().getFirstName() + " " + task.getAssignedTo().getLastName() : 
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
   
   
}
