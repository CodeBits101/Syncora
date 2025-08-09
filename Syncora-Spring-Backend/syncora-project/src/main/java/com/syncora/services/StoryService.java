package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.BacklogItemDto;

import com.syncora.dtos.StoryReqDto;
import com.syncora.dtos.StoryResponseDto;

public interface StoryService {

	List<BacklogItemDto> getBacklogStories();

	List<StoryResponseDto> getStories(Long id);
	
	ApiResponse addStory(StoryReqDto dto);
	
	ApiResponse updateStory(StoryReqDto dto, Long id);
	
	ApiResponse deleteStory(Long id);

	List<StoryResponseDto> getStoriesByProjectIdAndSprintId(Long id, Long pid , Long sid);
}
