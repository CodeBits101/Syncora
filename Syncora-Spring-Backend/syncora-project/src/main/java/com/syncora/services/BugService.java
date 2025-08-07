package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;
import com.syncora.dtos.BugReqDto;

public interface BugService {

	ApiResponse createBug(BugReqDto dto, Long id);
	List<BacklogItemDto> getBacklogBugs();
}
