package com.syncora.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.services.StoryServie;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/stories")
@Getter
@Setter
@AllArgsConstructor 

public class StoryController {
private final StoryServie storyService ; 
}
