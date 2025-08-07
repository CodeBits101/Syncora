package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.TaskReqDto;

public interface TaskService {

	ApiResponse createTask(TaskReqDto dto , Long id);
	List<BacklogItemDto> getBacklogTasks();
}
