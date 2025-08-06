package com.syncora.dtos;

import com.syncora.enums.TaskPriority;
import com.syncora.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskReqDto extends CommonReqDto {
    
	private TaskStatus status;
	private TaskPriority priority;

	private int debugCount;
	private int storyPoint;
	private boolean debugFlag;
	private boolean testingFlag;

	private Long assignedToId;
	private Long assignedById;
	private Long createdById;
	private Long projectId;
	private Long sprintId;
	private Long storyId;

}
