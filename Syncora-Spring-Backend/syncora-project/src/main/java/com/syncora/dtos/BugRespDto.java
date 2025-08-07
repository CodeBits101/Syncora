package com.syncora.dtos;

import com.syncora.enums.TaskPriority;
import com.syncora.enums.TaskStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BugRespDto extends CommonReqDto {
	private TaskStatus status;
    private TaskPriority priority;
    
	private String assignedTo;
	private String reportedBy;
	private int reopenCount;
	private String projectName;  
	private String sprintName; 
	private String storyName; 
	private int storyPoint;
	
}
