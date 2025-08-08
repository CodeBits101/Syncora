package com.syncora.servicesimpl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.BugReqDto;
import com.syncora.dtos.BugRespDto;
import com.syncora.entities.Bug;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.enums.TaskStatus;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.BugRepo;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;
import com.syncora.repositories.StoryRepo;
import com.syncora.services.BugService;
import com.syncora.services.TaskRespDto;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BugServiceImpl implements BugService {
   
   private final BugRepo bugRepo;
   private final ModelMapper modelMapper;
   private final EmployeeRepo empRepo;
   private final ProjectRepo projectRepo;
   private final SprintRepo sprintRepo;
   private final StoryRepo storyRepo;
   
   @Override
   public ApiResponse createBug(BugReqDto dto, Long id) {
       Employee reportedByEmp = empRepo.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with this id"));
       
       Employee assignedToEmp = null;
       if (dto.getAssignedToId() != null) {
           assignedToEmp = empRepo.findById(dto.getAssignedToId())
                   .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist to assign the bug"));
       }
       
       Project project = projectRepo.findById(dto.getProjectId())
               .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with this id"));
       
       Sprint sprint = null;
       if (dto.getSprintId() != null) {
           sprint = sprintRepo.findById(dto.getSprintId())
                   .orElseThrow(() -> new ResourceNotFoundException("Sprint does not exist with this id"));
       }
 
       Story story = null;
       if (dto.getStoryId() != null) {
           story = storyRepo.findById(dto.getStoryId())
                   .orElseThrow(() -> new ResourceNotFoundException("Story does not exist with this id"));
       }
       
       Bug createdBug = modelMapper.map(dto, Bug.class);
       createdBug.setReportedBy(reportedByEmp);
       createdBug.setAssignedTo(assignedToEmp);
       createdBug.setProject(project);
       createdBug.setSprint(sprint);
       createdBug.setStory(story);
       if(createdBug.getStory() == null)
    	   createdBug.setStatus(TaskStatus.BACKLOG);
       else
    	   createdBug.setStatus(TaskStatus.TODO);
       
               bugRepo.save(createdBug);
        
        return new ApiResponse("Bug Created successfully");
    }
   
    @Override
	public ApiResponse updateBug(BugReqDto dto, Long id) {
		// TODO Auto-generated method stub
	   Bug bug  = bugRepo.findById(id).
	    		orElseThrow(()->new ResourceNotFoundException("bug does not exist")) ;  
	    
	    Employee assignedToEmp  = empRepo.findById(dto.getAssignedToId()).
				orElseThrow(()-> new ResourceNotFoundException("employee does not exist to assign the bug")) ;
	    
	    modelMapper.map(dto, bug) ; 
	    
	    if(dto.getStatus() == null) {
			bug.setStatus(TaskStatus.BACKLOG);
		}
		
		if(dto.getSprintId() != null) {
			Sprint sprint = sprintRepo.findById(dto.getSprintId())
					 .orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist")) ;
			bug.setSprint(sprint);
		}
		
		if(dto.getStoryId() != null) {
			Story story = storyRepo.findById(dto.getStoryId())
					 .orElseThrow(()-> new ResourceNotFoundException("Story Does not exist")) ;
			bug.setStory(story);
			bug.setStatus(TaskStatus.TODO);
			if(story.getCurrentSprint() != null) {
				Sprint sprint = sprintRepo.findById(story.getCurrentSprint().getId()).orElseThrow(()->
				new ResourceNotFoundException("Sprint does not exist by this id")) ;  
				bug.setSprint(sprint);
			}
		}
		
	    bug.setAssignedTo(assignedToEmp);
	    bugRepo.save(bug) ; 
		return new ApiResponse("bug updated successfully");
	}
   
    @Override
	public ApiResponse changeStatus(TaskStatus changestatus, Long id) {
    	Bug bug  = bugRepo.findById(id).
        		orElseThrow(()->new ResourceNotFoundException("bug does not exist")) ;
    	
    	bug.setStatus(changestatus);
    	bugRepo.save(bug) ; 
    	return new ApiResponse("bug status updated successfully");
	}
    
    @Override
	public List<BugRespDto> getBugByStatus(Long id) {
		// TODO Auto-generated method stub
    	Story story  = storyRepo.findById(id)
    			.orElseThrow(()-> new ResourceNotFoundException("Sprint Does not exist")) ;
    	List<BugRespDto> bugList = bugRepo.findByStory(story).stream(). 
    			map(bug->{
    			  BugRespDto dto  =  modelMapper.map(bug, BugRespDto.class) ; 
    			  dto.setAssignedTo(bug.getAssignedTo().getEmpName()) ; 
    			  dto.setReportedBy(bug.getReportedBy().getEmpName()) ; 
    			  dto.setProjectName(bug.getProject().getTitle()) ; 
    			  dto.setStoryName(bug.getStory().getTitle()) ; 
    			  if(bug.getSprint() != null) {
    				  dto.setSprintName(bug.getSprint().getSprintName()) ; 
    			  }
    			  return dto ; 
    			}).toList();
    	return bugList;
	}
    
    @Override
	public ApiResponse deleteBug(Long id) {
		// TODO Auto-generated method stub
    	bugRepo.deleteById(id); 
    	return new ApiResponse("Bug Deleted successfully");
	}
    
    @Override
    public List<BacklogItemDto> getBacklogBugs(Long projectId) {
        List<Bug> bugs = bugRepo.findByStatusAndProjectId(TaskStatus.BACKLOG, projectId);
        return bugs.stream()
                .map(bug -> {
                    String assignedToName = bug.getAssignedTo() != null ? 
                        bug.getAssignedTo().getEmpName() : 
                        "Unassigned";
                    return new BacklogItemDto(
                        "BUG",
                        bug.getTitle(),
                        bug.getPriority(),
                        assignedToName,
                        bug.getId()
                    );
                })
                .collect(Collectors.toList());
    }

}
