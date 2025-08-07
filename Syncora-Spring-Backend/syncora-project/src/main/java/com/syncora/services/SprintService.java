package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SprintRequestDto;
import com.syncora.dtos.SprintResponseDto;

public interface SprintService {
	
	List<SprintResponseDto> getAllSprints();

	List<SprintResponseDto> getSprintByProjectId(Long projectId);

	ApiResponse addSprint(SprintRequestDto requestDto);

	ApiResponse updateSprint(SprintRequestDto requestDto, Long id);

	ApiResponse deleteSprint(Long id);
}
