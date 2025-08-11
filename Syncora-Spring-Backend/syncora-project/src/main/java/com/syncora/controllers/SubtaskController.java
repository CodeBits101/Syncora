package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.SubtaskReqDto;
import com.syncora.security.JwtUtils;
import com.syncora.services.SubtaskService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@RestController
@Getter
@Setter
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/subtasks")
public class SubtaskController {
	
	private final SubtaskService subtaskService;
	private final JwtUtils jwtUtils;
	private  AuthenticationManager authenticationManager;
	
	
	@GetMapping("/tasks")
	public ResponseEntity<?> getSubTasksByUserAndTask(
	        @RequestParam Long createdById,
	        @RequestParam Long taskId) {
	    return ResponseEntity.ok(subtaskService.getSubTasksByUserAndTask(createdById, taskId));
	}
	

	@GetMapping("/bugs")
	public ResponseEntity<?> getSubTasksByUserAndBug(
	        @RequestParam Long createdById,
	        @RequestParam Long bugId) {
	    return ResponseEntity.ok(subtaskService.getSubTasksByUserAndBug(createdById, bugId));
	}

	@PostMapping
	public ResponseEntity<?> createSubTasks(
			@RequestBody SubtaskReqDto dto, @RequestHeader("Authorization") String authHeader)
	{
		Long id = jwtUtils.getUserIdFromJwtToken(authHeader);
		return ResponseEntity.status(HttpStatus.CREATED).body(subtaskService.createSubtask(dto, id));
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubtask(@PathVariable Long id) {
	    return ResponseEntity.status(HttpStatus.CREATED).body(subtaskService.deleteSubtask(id)) ; 
    }
}
