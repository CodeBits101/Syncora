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
public class CommonReqDto extends BaseDto {

		private String title;
	    
	   
	    private String description;
		
		
		private LocalDateTime startDate;
		
	
		private LocalDateTime endDate;
		
		private LocalDateTime actualStartDate;
		
		
		private LocalDateTime actualEndDate; 
}
