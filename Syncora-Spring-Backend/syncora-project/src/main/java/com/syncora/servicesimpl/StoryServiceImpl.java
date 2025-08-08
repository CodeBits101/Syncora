package com.syncora.servicesimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.StoryReqDto;
import com.syncora.dtos.StoryResponseDto;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.enums.TaskPriority;
import com.syncora.enums.TaskStatus;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.StoryRepo;
import com.syncora.services.StoryService;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.repositories.SprintRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StoryServiceImpl implements StoryService {
   private final StoryRepo storyRepo ;
   private final ModelMapper modelMapper;
   private final ProjectRepo projectRepo;
   private final SprintRepo sprintRepo;
   private final EmployeeRepo empRepo;
   
       @Override
    public List<BacklogItemDto> getBacklogStories(Long projectId) {
        List<Story> stories = storyRepo.findByStoryStatusAndProjectId(TaskStatus.BACKLOG, projectId);
        return stories.stream()
                .map(story -> {
                    return new BacklogItemDto(
                        "STORY",
                        story.getTitle(),
                        TaskPriority.HIGH,  // Stories get HIGH priority
                        null,               // Stories don't have assignedTo
                        story.getId()
                    );
                })
                .collect(Collectors.toList());
    }

   @Override
public List<StoryResponseDto> getStories(Long uId) {
	Employee emp = empRepo.findById(uId).orElseThrow(()-> new ResourceNotFoundException("employee does not exists with this id"));
	Project project = emp.getProject();
	if(project == null && project.getId() == null)
	{
		throw new ResourceNotFoundException("employee does not have enrolled in any project");
	}
	
	List<Story> stories = project.getStories();
    return stories.stream().map(story -> {
        StoryResponseDto dto = new StoryResponseDto();
        dto.setTitle(story.getTitle());
        dto.setDescription(story.getDescription());

        if (story.getProject() != null) {
            dto.setProjectId(story.getProject().getId());
        }
        dto.setStartDate(story.getStartDate());
        dto.setEndDate(story.getEndDate());
        dto.setActualStartDate(story.getActualStartDate());
        dto.setActualEndDate(story.getActualEndDate());
        
        if(story.getCurrentSprint() != null)
        {
        	dto.setCurrentSprint(story.getCurrentSprint().getId());
        }
        if (story.getCreatedBy() != null) {
            dto.setCreatedBy(story.getCreatedBy().getId());
        }
        dto.setCreatedTimeStamp(story.getCreatedTimeStamp());
        dto.setUpdatedTimeStamp(story.getUpdatedTimeStamp());
        dto.setStoryStatus(story.getStoryStatus());

        return dto;
    }).toList();
}

@Override
public ApiResponse addStory(StoryReqDto dto) {
	Project project = projectRepo.findById(dto.getProject())
			 .orElseThrow(()-> new ResourceNotFoundException("Project Does not exist"));
	
	Employee createdBy = empRepo.findById(dto.getCreatedBy())
			.orElseThrow(() -> new ResourceNotFoundException("Employee id does not exist"));
	
	Story story = modelMapper.map(dto, Story.class);

	if(dto.getCurrentSprint() != null) {
		Sprint sprint = sprintRepo.findById(dto.getCurrentSprint())
				.orElseThrow(()-> new ResourceNotFoundException("sprint does not exist"));
		story.setCurrentSprint(sprint);
		story.setStoryStatus(TaskStatus.TODO);
	}
	else {
		story.setStoryStatus(TaskStatus.BACKLOG);
	}
	
	story.setCreatedBy(createdBy);
	story.setProject(project);
	storyRepo.save(story);
	return new ApiResponse("Story has been created successfully...");
	
}
   

@Override
public ApiResponse updateStory(StoryReqDto dto, Long id)
{
	Story story = storyRepo.findById(id).orElseThrow(()->
    new ResourceNotFoundException("Story does not exist"));
	modelMapper.map(dto, story);
	storyRepo.save(story);
	return new ApiResponse("Story has been updated successfully...");
}

@Override
public ApiResponse deleteStory(Long id) {
	Story story = storyRepo.findById(id).orElseThrow(()->
    new ResourceNotFoundException("Story does not exist"));
	storyRepo.deleteById(id);
	return new ApiResponse("Story has been deleted successfully...");
}



}
