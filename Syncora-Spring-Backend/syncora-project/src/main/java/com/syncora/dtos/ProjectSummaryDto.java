package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectSummaryDto {
	private ProjectStoriesSummaryDto stories;
	private ProjectTasksSummaryDto tasks;
	private ProjectBugsSummaryDto bugs;
}
