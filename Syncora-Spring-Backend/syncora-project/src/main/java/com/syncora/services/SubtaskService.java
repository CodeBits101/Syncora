package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SubtaskReqDto;
import com.syncora.entities.SubTask;

public interface SubtaskService {

	ApiResponse createSubtask(SubtaskReqDto dto, Long id);

	List<SubTask> getSubTasksByUserAndTask(Long createdById, Long taskId);

	List<SubTask> getSubTasksByUserAndBug(Long createdById, Long bugId);

}
