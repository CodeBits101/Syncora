package com.syncora.dtos;

import java.util.List;

import com.syncora.services.TaskRespDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDetailsRespDto {
	private ProjectResponseDto project;
	private SprintCountDto sprintCounts;
	private ProjectSummaryDto summary;
	private SprintTaskCountDto currentSprintSummary;
		
	private List<TaskRespDto> inProgressTasks;
	private List<SprintSummaryDto> sprintDetails;
	
	private Double projectProgress;
	
	private List<EmployeeStatsDto> empStats; 
	
	
	
}
