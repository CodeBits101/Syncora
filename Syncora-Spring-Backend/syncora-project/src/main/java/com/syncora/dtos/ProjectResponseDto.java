package com.syncora.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponseDto {
	    private String title;
	    private String description;
	    private String projectCode;
	    private String projectStatus;
	    private Long managerId;
	    private LocalDateTime createdTimeStamp;
	    private LocalDateTime startDate;
	    private LocalDateTime endDate;
	    private LocalDateTime updatedTimeStamp;
}

