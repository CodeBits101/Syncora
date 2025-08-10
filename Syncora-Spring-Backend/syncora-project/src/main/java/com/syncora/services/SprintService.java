package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SprintRequestDto;
import com.syncora.dtos.SprintResponseDto;
import com.syncora.dtos.SprintItemsRespDto;

public interface SprintService {
	
	List<SprintResponseDto> getAllSprints();

	List<SprintResponseDto> getSprintByProjectId(Long projectId);

	SprintItemsRespDto getSprintItems(Long sprintId);

	ApiResponse addSprint(SprintRequestDto requestDto);

	ApiResponse updateSprint(SprintRequestDto requestDto, Long id);

	ApiResponse deleteSprint(Long id);

	ApiResponse startSprint(Long id, Long projectId);

	ApiResponse completeSprint(Long id);
}
