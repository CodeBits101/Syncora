package com.syncora.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoryReqDto {
	private String title;
    private String description;
    private long project;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private LocalDateTime actualStartDate;
	private LocalDateTime actualEndDate;
	private Long currentSprint;
	private long createdBy;
}
