package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CombinedReportDto {
	private SprintCountDto sprintCounts;
    private ProjectSummaryDto summary;
}
