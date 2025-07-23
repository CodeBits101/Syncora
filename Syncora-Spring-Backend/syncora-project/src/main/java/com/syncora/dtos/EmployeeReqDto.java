package com.syncora.dtos;

import java.time.LocalDateTime;

import com.syncora.entities.Department;
import com.syncora.entities.Employee;
import com.syncora.entities.Project;
import com.syncora.enums.EmployeeType;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeReqDto extends BaseDto {
  
	  private String empName;
		
	  private String email ;  
		
	  private String password ;  
		
	  private String phoneNumber ; 
		
		
	  private Long departmentId ;
	
	  private Long managerId ;
		
	  private Long projectId ;  
		
	  private LocalDateTime doj;
	
	  private EmployeeType empRole ;
}
