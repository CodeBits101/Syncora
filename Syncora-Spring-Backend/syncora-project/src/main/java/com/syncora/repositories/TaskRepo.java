package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {


	List<Task> findBySprintIsNullAndStoryIsNullAndProjectId(Long projectId);

   List<Task> findByStory(Story story);

}
