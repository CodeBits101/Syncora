package com.syncora.dtos;

import java.time.LocalDateTime;

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
public class TaskResponseDto {
	private Long id;
	private TaskStatus status;
    private TaskPriority priority;
    private String title;
    private LocalDateTime startDate;
	
	
	private LocalDateTime endDate;

}
