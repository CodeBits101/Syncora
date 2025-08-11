package com.syncora.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.syncora.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEditReqDto {
	private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private ProjectStatus projectStatus;
    private Long managerId;
    private List<Long> employeesToAdd;
    private List<Long> employeesToRemove;


}
