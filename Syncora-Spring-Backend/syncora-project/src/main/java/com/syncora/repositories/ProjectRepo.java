package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Project;

public interface ProjectRepo extends JpaRepository<Project, Long> {

}
