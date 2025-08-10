package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.BugReqDto;
import com.syncora.dtos.BugRespDto;
import com.syncora.dtos.TaskReqDto;
import com.syncora.enums.TaskStatus;

public interface BugService {

	ApiResponse createBug(BugReqDto dto, Long id);
	List<BacklogItemDto> getBacklogBugs(Long projectId);
	ApiResponse updateBug(BugReqDto dto, Long id);
	ApiResponse changeStatus(TaskStatus changestatus, Long id);
	List<BugRespDto> getBugByStatus(Long id);
	ApiResponse deleteBug(Long id);
	BugRespDto getBugById(Long id);
}
