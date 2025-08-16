package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SprintTaskCountDto {
	private Long sprintBacklogTasks;
	private Long sprintTodoTasks;
	private Long sprintInprogressTasks;
	private Long sprintTestingTasks;
	private Long sprintDeploymentTasks;
}
