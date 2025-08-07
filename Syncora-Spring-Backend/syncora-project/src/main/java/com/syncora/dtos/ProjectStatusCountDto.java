package com.syncora.dtos;

import com.syncora.enums.ProjectStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProjectStatusCountDto { 
	  private ProjectStatus status;
	    private Long count;

	    public ProjectStatusCountDto(ProjectStatus status, Long count) {
	        this.status = status;
	        this.count = count;
	    }
}
