package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.TaskReqDto;
import com.syncora.enums.TaskStatus;
import com.syncora.security.JwtUtils;
import com.syncora.services.TaskService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/tasks")
@Getter
@Setter
@AllArgsConstructor
@CrossOrigin

public class TaskController {
 
	private final JwtUtils jwtUtils;
	private  AuthenticationManager authenticationManager;
	 private final TaskService taskService ; 
	 
	 
  
  @PostMapping("/add")
  public ResponseEntity<?> createTask
  (@RequestBody TaskReqDto dto , @RequestHeader("Authorization") String authHeader) {
	  Long id = jwtUtils.getUserIdFromJwtToken(authHeader); 
      return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto ,id)) ; 
  }
  
  @PutMapping("/update/{id}")
  public ResponseEntity<?> updateTask
  (@RequestBody TaskReqDto dto ,@PathVariable Long id) { 
      return ResponseEntity.status(HttpStatus.CREATED).body(taskService.updateTask(dto ,id)) ; 
  }
  
  @PutMapping("/{changestatus}/{id}")
  public ResponseEntity<?> changeStatus
  (@PathVariable TaskStatus changestatus ,@PathVariable Long id) { 
      return ResponseEntity.status(HttpStatus.CREATED).body(taskService.changeStatus(changestatus ,id)) ; 
  }
  
  @GetMapping("/gettaskbystatus/{id}")
  public ResponseEntity<?> getTaskByStatus
  (@PathVariable Long id) { 
      return ResponseEntity.status(HttpStatus.CREATED).body(taskService.getTaskByStatus(id)) ; 
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteTask(@PathVariable Long id) {
      return ResponseEntity.status(HttpStatus.CREATED).body(taskService.deleteTask(id)) ; 
  }
}
