package com.syncora.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.syncora.dtos.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionhandler {

	@ExceptionHandler(ApiException.class)
	  public ResponseEntity<?> handleApiException(ApiException e){
		  System.out.println("in api exception block " + e);
		  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage())) ; 
	  }  
	
	@ExceptionHandler(ResourceNotFoundException.class)
	  public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e){
		  System.out.println("in resource not found block " + e);
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage())) ; 
	  }
	
	
  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleException(Exception e){
	  System.out.println("in generic exception block " + e);
	  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage())) ; 
  }
}
