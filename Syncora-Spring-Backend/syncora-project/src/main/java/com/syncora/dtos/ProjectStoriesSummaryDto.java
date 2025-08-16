package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectStoriesSummaryDto {
	
	private Long backlog;
	private Long todo;
	private Long inprogress;
	private Long testing;
	private Long deployment;

}
