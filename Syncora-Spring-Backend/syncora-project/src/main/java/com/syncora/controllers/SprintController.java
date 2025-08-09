package com.syncora.controllers;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SprintRequestDto;
import com.syncora.dtos.SprintResponseDto;
import com.syncora.services.SprintService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/sprints")
@Getter
@Setter
@AllArgsConstructor
@CrossOrigin
public class SprintController {
 private final SprintService sprintService ; 
	
	//  BASIC CRUD
	 @GetMapping
	 public ResponseEntity<List<SprintResponseDto>> getAllSprints()
	 {
		 return ResponseEntity.ok(sprintService.getAllSprints());
	 }
	 
	 @GetMapping("/{id}")
	 public ResponseEntity<List<SprintResponseDto>> getSprint(@PathVariable Long id)
	 {
		 return ResponseEntity.ok(sprintService.getSprintByProjectId(id));
	 }
	 
	 @PostMapping
	 public ResponseEntity<ApiResponse> createSprint(@RequestBody SprintRequestDto requestDto)
	 {
		 return ResponseEntity.status(HttpStatus.CREATED).body(sprintService.addSprint(requestDto));
	 }
 
	 @PutMapping("/{id}")
	 public ResponseEntity<ApiResponse> updateSprint(@RequestBody SprintRequestDto requestDto, @PathVariable Long id)
	 {
		 return ResponseEntity.ok(sprintService.updateSprint(requestDto, id));
	 }
	 
	 @DeleteMapping("/{id}")
	 public ResponseEntity<ApiResponse> deleteSprint(@PathVariable Long id)
	 {
		 return ResponseEntity.ok(sprintService.deleteSprint(id));
	 }
	 
	 @PutMapping("/{id}/start")
	 public ResponseEntity<ApiResponse> startSprint(@PathVariable Long id, @RequestParam Long projectId)
	 {
		 return ResponseEntity.ok(sprintService.startSprint(id, projectId));
	 }
	 
	 @PutMapping("/{id}/complete")
	 public ResponseEntity<ApiResponse> completeSprint(@PathVariable Long id)
	 {
		 return ResponseEntity.ok(sprintService.completeSprint(id));
	 }
	 
 
 
}
