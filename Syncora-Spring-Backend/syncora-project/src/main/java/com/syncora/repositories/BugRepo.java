package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Bug;

public interface BugRepo extends JpaRepository<Bug, Long> {

	List<Bug> findBySprintIsNullAndStoryIsNull();
}
