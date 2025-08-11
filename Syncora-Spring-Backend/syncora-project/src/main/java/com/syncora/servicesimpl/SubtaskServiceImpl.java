package com.syncora.servicesimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SubtaskReqDto;
import com.syncora.dtos.SubtasksRespDto;
import com.syncora.entities.Employee;
import com.syncora.entities.SubTask;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.BugRepo;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.SubtaskRepo;
import com.syncora.repositories.TaskRepo;
import com.syncora.services.SubtaskService;

import lombok.AllArgsConstructor;



@Service
@Transactional
@AllArgsConstructor
public class SubtaskServiceImpl implements SubtaskService {

	private final SubtaskRepo subtaskRepo;
	private final EmployeeRepo empRepo;
	private final BugRepo bugRepo;
	private final TaskRepo taskRepo;
	@Override
	public ApiResponse createSubtask(SubtaskReqDto dto, Long id) {
		// TODO Auto-generated method stub
		Employee emp = empRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("employee does not exists with this id"));
		
		
			SubTask subtask = new SubTask();
			subtask.setTitle(dto.getTitle());
			subtask.setDescription(dto.getDescription());
			subtask.setCreatedBy(emp);
			subtask.setStatus(dto.getStatus());
			if(dto.getBugId() != null)
			{
				subtask.setBug(bugRepo.findById(dto.getBugId()).orElseThrow(()-> new ResourceNotFoundException("Bug not found !")));
			}
			
			if(dto.getTaskId() != null)
			{
				subtask.setTask(taskRepo.findById(dto.getTaskId()).orElseThrow(()-> new ResourceNotFoundException("Task not found")));
			}
			
			
			subtaskRepo.save(subtask);
		return new ApiResponse("Subtask created Successfully"); 
	}

	@Override
	public List<SubtasksRespDto> getSubTasksByUserAndTask(Long createdById, Long TaskId) {
	    List<SubTask> subtasks = subtaskRepo.findByCreatedByIdAndTaskId(createdById, TaskId);

	    // Map each Subtask entity to SubtasksRespDto
	    return subtasks.stream()
	            .map(s -> new SubtasksRespDto(
	                    s.getId(),
	                    s.getTask() != null ? s.getTask().getId() : null,
	                    s.getBug() != null ? s.getBug().getId() : null,
	                    s.getTitle(),
	                    s.getStatus()
	            ))
	            .collect(Collectors.toList());
	}

	@Override
	public List<SubtasksRespDto> getSubTasksByUserAndBug(Long createdById, Long bugId) {
	    List<SubTask> subtasks = subtaskRepo.findByCreatedByIdAndBugId(createdById, bugId);

	    // Map each Subtask entity to SubtasksRespDto
	    return subtasks.stream()
	            .map(s -> new SubtasksRespDto(
	                    s.getId(),
	                    s.getTask() != null ? s.getTask().getId() : null,
	                    s.getBug() != null ? s.getBug().getId() : null,
	                    s.getTitle(),
	                    s.getStatus()
	            ))
	            .collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteSubtask(Long id) {
		// TODO Auto-generated method stub
    	subtaskRepo.deleteById(id); 
    	return new ApiResponse("Subtask Deleted successfully");
	}
}
