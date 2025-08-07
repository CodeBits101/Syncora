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
public class BugReqDto extends CommonReqDto {
    
	private TaskStatus status;
	private TaskPriority priority;
	
	private int reopenCount;
	private int storyPoint;
	
	private Long reportedById;
	private Long assignedToId;
	private Long projectId;
	private Long sprintId;
	private Long storyId;
} 