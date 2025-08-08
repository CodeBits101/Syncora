package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Story;
import com.syncora.enums.TaskStatus;

public interface StoryRepo extends JpaRepository<Story, Long> {


	List<Story> findAllByProject_Id(Long projectId);

    List<Story> findByStoryStatusAndProjectId(TaskStatus storyStatus, Long projectId);

    List<Story> findBySprints_Id(Long sprintId);
    List<Story> findByCurrentSprint_Id(Long sprintId);

}