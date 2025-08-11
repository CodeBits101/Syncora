package com.syncora.dtos;

import com.syncora.entities.Department;
import com.syncora.enums.EmployeeType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmpsForProjectRespDto {
	private Long id;
	private String empName;
	private String email;
	private String department;
	private EmployeeType empRole;
	private String currentManager;
}
