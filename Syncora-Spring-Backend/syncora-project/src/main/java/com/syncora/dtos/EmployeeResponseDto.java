package com.syncora.dtos;

import java.time.LocalDateTime;

import com.syncora.enums.EmployeeType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponseDto extends BaseDto {
   
	private String empName;
	
	  private String email ;  
		
	  private String phoneNumber ; 
		
		
	  private String departName ;
	
	  private String managerName ;
		
	  private String projectName ;  
		
	  private LocalDateTime doj;
	
	  private EmployeeType empRole ;
}
