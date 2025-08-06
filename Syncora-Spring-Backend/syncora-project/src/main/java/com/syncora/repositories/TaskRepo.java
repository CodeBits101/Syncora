package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {

}
