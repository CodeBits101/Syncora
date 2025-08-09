package com.syncora.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponseDto extends BaseDto{
	    private String title;
	    private String description;
	    private String projectCode;
	    private String projectStatus;
	    private Long managerId;
	    private String managerName;
	    private LocalDateTime startDate;
	    private LocalDateTime endDate;
}

