package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.enums.TaskStatus;

public interface TaskRepo extends JpaRepository<Task, Long> {


    	List<Task> findByStatusAndProjectId(TaskStatus status, Long projectId);

   List<Task> findByStory(Story story);

   List<Task> findBySprint_Id(Long sprintId);

}
