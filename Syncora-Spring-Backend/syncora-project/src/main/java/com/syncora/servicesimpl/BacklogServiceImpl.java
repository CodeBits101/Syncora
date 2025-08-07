package com.syncora.servicesimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.BacklogItemDto;
import com.syncora.services.BacklogService;
import com.syncora.services.BugService;
import com.syncora.services.StoryService;
import com.syncora.services.TaskService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BacklogServiceImpl implements BacklogService {
    
    private final StoryService storyService;
    private final TaskService taskService;
    private final BugService bugService;
    
    @Override
    public List<BacklogItemDto> getBacklogItems(Long projectId) {
        List<BacklogItemDto> backlogItems = new ArrayList<>();
        
        // Add stories (no sprint AND belong to project)
        backlogItems.addAll(storyService.getBacklogStories(projectId));
        
        // Add tasks (no sprint AND no story AND belong to project)
        backlogItems.addAll(taskService.getBacklogTasks(projectId));
        
        // Add bugs (no sprint AND no story AND belong to project)
        backlogItems.addAll(bugService.getBacklogBugs(projectId));
        
        return backlogItems;
    }
}
