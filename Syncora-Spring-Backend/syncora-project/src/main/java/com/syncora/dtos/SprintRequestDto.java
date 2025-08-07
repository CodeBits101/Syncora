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
public class SprintRequestDto {
	 private String sprintName;
	 private Long projectId;
	 private String description;
	 private LocalDateTime StartDate;
	 private LocalDateTime EndDate;
	 private Long managerId;
	 private String status;

}
