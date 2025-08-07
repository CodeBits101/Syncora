package com.syncora.servicesimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.BacklogItemDto;
import com.syncora.entities.Story;
import com.syncora.repositories.StoryRepo;
import com.syncora.services.StoryServie;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StoryServiceImpl implements StoryServie {
   private final StoryRepo storyRepo ;
   
   @Override
   public List<BacklogItemDto> getBacklogStories() {
       List<Story> stories = storyRepo.findBySprintIsNull();
       return stories.stream()
               .map(story -> {
                   String assignedToName = story.getAssignedTo() != null ? 
                       story.getAssignedTo().getFirstName() + " " + story.getAssignedTo().getLastName() : 
                       "Unassigned";
                   return new BacklogItemDto(
                       "STORY",
                       story.getTitle(),
                       story.getPriority(),
                       assignedToName,
                       story.getId()
                   );
               })
               .collect(Collectors.toList());
   }
}
