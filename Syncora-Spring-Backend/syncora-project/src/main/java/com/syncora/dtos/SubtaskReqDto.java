package com.syncora.dtos;

import com.syncora.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubtaskReqDto {
	 
		private String title;
	    private String description;
	    private TaskStatus status;
	    private Long createdBy;
	    private Long taskId;
	    private Long bugId;
	
}
