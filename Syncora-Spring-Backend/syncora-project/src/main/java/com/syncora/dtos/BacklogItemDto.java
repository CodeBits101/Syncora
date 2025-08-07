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
public class BacklogItemDto {
    
    private String type; // "STORY", "TASK", or "BUG"
    private String title;
    private TaskStatus status;
    private String assignedToName ;
    private Long id;
    private TaskPriority priority ;
    
	public BacklogItemDto(String type, String title, TaskStatus status, Long id) {
		
		this.type = type;
		this.title = title;
		this.status = status;
		this.id = id;
	}
    
    
}
