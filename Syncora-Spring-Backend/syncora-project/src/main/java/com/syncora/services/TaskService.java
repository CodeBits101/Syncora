package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.TaskReqDto;
import com.syncora.enums.TaskStatus;

public interface TaskService {

	ApiResponse createTask(TaskReqDto dto , Long id);

	List<BacklogItemDto> getBacklogTasks();


	ApiResponse deleteTask(Long id);

	ApiResponse updateTask(TaskReqDto dto, Long id);

	ApiResponse changeStatus(TaskStatus changestatus, Long id);

	List<TaskRespDto> getTaskByStatus(Long id);


}
