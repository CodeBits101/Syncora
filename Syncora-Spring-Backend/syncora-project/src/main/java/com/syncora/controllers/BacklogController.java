package com.syncora.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.BacklogItemDto;
import com.syncora.services.BacklogService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/backlog")
@Getter
@Setter
@AllArgsConstructor
@CrossOrigin
public class BacklogController {
    
    private final BacklogService backlogService;
    
    @GetMapping("/items/{projectId}")
    public ResponseEntity<List<BacklogItemDto>> getBacklogItems(@PathVariable Long projectId) {
        List<BacklogItemDto> backlogItems = backlogService.getBacklogItems(projectId);
        return ResponseEntity.ok(backlogItems);
    }
}
