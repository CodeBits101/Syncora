package com.syncora.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

public class ApiResponse {
	private LocalDateTime timeStamp ; 
     private String message ; 
     
     public ApiResponse(String message) {
		this.timeStamp  = LocalDateTime.now(); 
		this.message = message ; 
	}
}
