package com.syncora.dtos;

import java.time.LocalDateTime;

import com.syncora.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoryResponseDto extends BaseDto {

	private String title;
    private String description;
    private Long projectId;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private LocalDateTime actualStartDate;
	private LocalDateTime actualEndDate;
	private Long currentSprint;
	private TaskStatus storyStatus;
	private Long createdBy;
	
	//Newly added field for help with backlog update feature story modal
	private String projectName;
	
	public StoryResponseDto(Long id , LocalDateTime createdTimeStamp , LocalDateTime updateTimeStamp,String title, String description, Long projectId, LocalDateTime startDate,
			LocalDateTime endDate, LocalDateTime actualStartDate, LocalDateTime actualEndDate) {
		super(id,createdTimeStamp,updateTimeStamp);
		this.title = title;
		this.description = description;
		this.projectId = projectId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.actualStartDate = actualStartDate;
		this.actualEndDate = actualEndDate;
	}
	
}
