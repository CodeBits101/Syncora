package com.syncora.services;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.TaskReqDto;

public interface TaskService {

	ApiResponse createTask(TaskReqDto dto , Long id);

}
