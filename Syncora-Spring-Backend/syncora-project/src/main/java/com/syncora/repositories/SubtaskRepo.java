package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.SubTask;

public interface SubtaskRepo extends JpaRepository<SubTask,Long> {


	List<SubTask> findByCreatedByIdAndTaskId(Long createdById, Long taskId);

	List<SubTask> findByCreatedByIdAndBugId(Long createdById, Long bugId);

}
