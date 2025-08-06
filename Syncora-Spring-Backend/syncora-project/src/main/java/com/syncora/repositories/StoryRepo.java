package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Story;

public interface StoryRepo extends JpaRepository<Story, Long> {

}