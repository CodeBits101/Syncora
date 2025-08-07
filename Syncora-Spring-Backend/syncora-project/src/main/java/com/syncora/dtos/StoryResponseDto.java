package com.syncora.dtos;

import java.time.LocalDateTime;

import com.syncora.enums.TaskStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoryResponseDto {
	
	private String title;
    private String description;
    private Long projectId;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private LocalDateTime actualStartDate;
	private LocalDateTime actualEndDate;
	private Long currentSprint;
	private TaskStatus storyStatus;
	private Long createdBy;
	private LocalDateTime createdTimeStamp;
	private LocalDateTime updatedTimeStamp;
	
}
