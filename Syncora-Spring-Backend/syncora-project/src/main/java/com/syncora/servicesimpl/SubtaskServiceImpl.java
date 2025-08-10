package com.syncora.servicesimpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SubtaskReqDto;
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
	public List<SubTask> getSubTasksByUserAndTask(Long createdById, Long taskId) {
	    return subtaskRepo.findByCreatedByIdAndTaskId(createdById, taskId);
	}

	@Override
	public List<SubTask> getSubTasksByUserAndBug(Long createdById, Long bugId) {
		return subtaskRepo.findByCreatedByIdAndBugId(createdById, bugId);
	}


}
