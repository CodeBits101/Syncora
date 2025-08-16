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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.ProjectEditReqDto;
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
	public ResponseEntity<?> getAllInprogressProjects(@RequestHeader("Authorization") String authHeader){
		Long managerId = jwtUtls.getUserIdFromJwtToken(authHeader) ;
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getInProgressProjects(managerId));
	}
	
	@GetMapping("/{category}")
	public ResponseEntity<?> getAllProjectsByStatus(@PathVariable String category, @RequestHeader("Authorization") String authHeader ) {
		Long managerId = jwtUtls.getUserIdFromJwtToken(authHeader) ;
		ProjectStatus status = ProjectStatus.valueOf(category.toUpperCase());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectsByStatus(managerId,status));
	}
	
	@PostMapping
	public ResponseEntity<?> addProject(@RequestBody ProjectReqDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(dto));
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateProject(@PathVariable Long id,@RequestBody ProjectEditReqDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(projectService.updateProject(id, dto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProject(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(projectService.deleteProject(id));
	}
	
	@GetMapping("/statuscount")
	public ResponseEntity<?> getProjectsByStatusCount(@RequestHeader("Authorization") String authHeader) {
		Long managerId = jwtUtls.getUserIdFromJwtToken(authHeader);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectByStatusCount(managerId));
	}
	
	@GetMapping("/manager/{managerId}")
	public ResponseEntity<?> getProjectByManagerId(@PathVariable Long managerId)
	{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectByManagerId(managerId));
		
	}
	
	@GetMapping("/getbacklog/{id}")
	public ResponseEntity<?> getBackLogItems(@PathVariable Long id,@RequestHeader("Authorization") String authHeader)
	{ 
		Long managerId = jwtUtls.getUserIdFromJwtToken(authHeader) ;
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getBackLogItems(id,managerId));
		
	}
	
	@GetMapping("/{id}/details")
	public ResponseEntity<?> getProjectDetails(@PathVariable Long id, @RequestHeader("Authorization") String authHeader)
	{
		Long empId = jwtUtls.getUserIdFromJwtToken(authHeader) ;

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectService.getProjectDetails(id, empId));
	}
	
}