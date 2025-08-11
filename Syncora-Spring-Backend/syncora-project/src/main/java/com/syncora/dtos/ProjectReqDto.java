package com.syncora.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.syncora.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectReqDto {
	private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime actualStartDate;
    private LocalDateTime actualEndDate;
    private ProjectStatus projectStatus;
    private Long managerId;
    private List<Long> employeeIds;


}