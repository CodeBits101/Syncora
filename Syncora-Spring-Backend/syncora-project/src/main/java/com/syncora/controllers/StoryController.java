package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.StoryReqDto;
import com.syncora.security.JwtUtils;
import com.syncora.services.StoryService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/stories")
@Getter
@Setter
@AllArgsConstructor

public class StoryController {
private final StoryService storyService;
private final JwtUtils jwtUtils;

@GetMapping
public ResponseEntity<?> getStories(@RequestHeader("Authorization") String authHeader) {
	Long id = jwtUtils.getUserIdFromJwtToken(authHeader);
	return ResponseEntity.status(HttpStatus.ACCEPTED).body(storyService.getStories(id));
}

@PostMapping("/add")
public ResponseEntity<?> addStory(@RequestBody StoryReqDto dto) {
	return ResponseEntity.status(HttpStatus.CREATED).body(storyService.addStory(dto));
}

@PutMapping("/update/{id}")
public ResponseEntity<?> updateStory(@RequestBody StoryReqDto dto, @PathVariable Long id)
{
	return ResponseEntity.status(HttpStatus.CREATED).body(storyService.updateStory(dto, id));
	
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteStory(@PathVariable long id)
{
	return ResponseEntity.status(HttpStatus.OK).body(storyService.deleteStory(id));
}
}
