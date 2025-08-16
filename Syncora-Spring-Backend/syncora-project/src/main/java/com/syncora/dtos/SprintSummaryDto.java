package com.syncora.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SprintSummaryDto {
		private Long id;
	    private String sprintName;
	    private String description;
	    private Long storiesCount;
	    private Long tasksCount;
	    private Long subTasksCount;
	    private Long bugsCount;
	    private LocalDateTime actualStartDate;
	    private LocalDateTime actualEndDate;

}
