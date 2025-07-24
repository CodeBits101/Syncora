package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.DeptDto;
import com.syncora.services.DeptService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/departments")
@AllArgsConstructor
@CrossOrigin
public class DeptController {
  private final DeptService deptService; 
  
  @GetMapping
  public ResponseEntity<?> getDepartments(){
	  return ResponseEntity.status(HttpStatus.ACCEPTED).body(deptService.getDepartments());
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<?> getDepartmentById(@PathVariable Long id){
	  return ResponseEntity.status(HttpStatus.OK).body(deptService.getDepartmentById(id));
  }
  
  @PostMapping
  public ResponseEntity<?> addDepartment(@RequestBody DeptDto dto) {
	  return ResponseEntity.status(HttpStatus.CREATED).body(deptService.addDepartment(dto));
  }
  
  @PutMapping("/{id}") 
  public ResponseEntity<?> updateDepartment(@PathVariable Long id , @RequestBody DeptDto dto){
	  return ResponseEntity.status(HttpStatus.OK).body(deptService.updateDepartment(id ,dto));
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteDepartment(@PathVariable Long id){
	  return ResponseEntity.status(HttpStatus.OK).body(deptService.deleteDepartment(id));
  }
}
