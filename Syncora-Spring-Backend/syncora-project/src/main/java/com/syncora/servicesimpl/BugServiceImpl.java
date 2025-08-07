package com.syncora.servicesimpl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.BugReqDto;
import com.syncora.entities.Bug;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.enums.TaskStatus;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.BugRepo;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;
import com.syncora.repositories.StoryRepo;
import com.syncora.services.BugService;

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
    public List<BacklogItemDto> getBacklogBugs() {
        List<Bug> bugs = bugRepo.findBySprintIsNullAndStoryIsNull();
        return bugs.stream()
                .map(bug -> {
                    String assignedToName = bug.getAssignedTo() != null ? 
                        bug.getAssignedTo().getFirstName() + " " + bug.getAssignedTo().getLastName() : 
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
