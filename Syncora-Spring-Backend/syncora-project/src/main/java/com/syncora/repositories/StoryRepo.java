package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Story;

public interface StoryRepo extends JpaRepository<Story, Long> {

	List<Story> findBySprintIsNull();
}