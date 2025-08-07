package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Story;

public interface StoryRepo extends JpaRepository<Story, Long> {

//	List<Story> findByCurrentSprintIsNull();
	List<Story> findAllByProject_Id(Long projectId);
	List<Story> findBySprintIsNullAndProjectId(Long projectId);

}