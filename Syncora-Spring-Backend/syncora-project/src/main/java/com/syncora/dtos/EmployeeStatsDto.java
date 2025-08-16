package com.syncora.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeStatsDto {
	 private Long empId;
	    private String empName;
	    private LocalDate doj;
	    private Long completedCount;
	    private Long pendingCount;
	    private double performance;
}