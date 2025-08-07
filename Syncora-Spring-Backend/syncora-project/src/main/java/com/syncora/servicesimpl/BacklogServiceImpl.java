package com.syncora.servicesimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.BacklogItemDto;
import com.syncora.services.BacklogService;
import com.syncora.services.BugService;
import com.syncora.services.StoryServie;
import com.syncora.services.TaskService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BacklogServiceImpl implements BacklogService {
    
    private final StoryServie storyService;
    private final TaskService taskService;
    private final BugService bugService;
    
    @Override
    public List<BacklogItemDto> getBacklogItems() {
        List<BacklogItemDto> backlogItems = new ArrayList<>();
        
        // Add stories (no sprint)
        backlogItems.addAll(storyService.getBacklogStories());
        
        // Add tasks (no sprint AND no story)
        backlogItems.addAll(taskService.getBacklogTasks());
        
        // Add bugs (no sprint AND no story)
        backlogItems.addAll(bugService.getBacklogBugs());
        
        return backlogItems;
    }
}
