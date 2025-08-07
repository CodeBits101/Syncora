package com.syncora.dtos;

import com.syncora.enums.TaskPriority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BacklogItemDto {
    
    private String type; // "STORY", "TASK", or "BUG"
    private String title;
    private TaskPriority priority;
    private String assignedTo; // Employee name
    private Long id;
}
