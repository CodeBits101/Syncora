package com.syncora.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
 private final SprintService sprintServive ;   
}
