package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.ProjectReqDto;
import com.syncora.enums.ProjectStatus;
import com.syncora.security.JwtUtils;
import com.syncora.services.ProjectService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/projects")
@AllArgsConstructor
@CrossOrigin
public class ProjectController {
	
	private final ProjectService projectService;
	
	private final JwtUtils jwtUtls;

	@GetMapping
	public ResponseEntity<?> getAllInprogressProjects(){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getInProgressProjects());
	}
	
	@GetMapping("/{category}")
	public ResponseEntity<?> getAllProjectsByStatus(@PathVariable String category) {
		ProjectStatus status = ProjectStatus.valueOf(category.toUpperCase());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectsByStatus(status));
	}
	
	@PostMapping
	public ResponseEntity<?> addProject(@RequestBody ProjectReqDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(dto));
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateProject(@PathVariable Long id,@RequestBody ProjectReqDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(id, dto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProject(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(projectService.deleteProject(id));
	}
	
	@GetMapping("/statuscount")
	public ResponseEntity<?> getProjectsByStatusCount() {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectByStatusCount());
	}
}