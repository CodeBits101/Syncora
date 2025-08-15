package com.syncora.services;

import com.syncora.dtos.CommonReqDto;
import com.syncora.enums.TaskPriority;
import com.syncora.enums.TaskStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class TaskRespDto extends CommonReqDto {
	
	
	private TaskStatus status;
    private TaskPriority priority;
    
	private String assignedTo;
	private String assignToEmail; 
	private String createdBy; 
	private String projectName;  
	private String sprintName; 
	private String storyName; 
	
	private int debugCount;
	private int storyPoint;
	private boolean debugFlag;
	private boolean testingFlag;
	
	//Newly added for backlog update
	private Long projectId;
	private Long assignedToId;
	
}
