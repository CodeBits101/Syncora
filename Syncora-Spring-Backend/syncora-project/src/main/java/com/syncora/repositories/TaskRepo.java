package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Sprint;
import com.syncora.entities.Story;
import com.syncora.entities.Task;
import com.syncora.enums.TaskStatus;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;



import com.syncora.enums.TaskStatus;

public interface TaskRepo extends JpaRepository<Task, Long> {


    	List<Task> findByStatusAndProjectId(TaskStatus status, Long projectId);

   List<Task> findByStory(Story story);
   
   List<Task> findByStatusAndCreatedByAndProject(TaskStatus status, Employee createdBy, Project project);
   

   List<Task> findBySprint_Id(Long sprintId);

}
