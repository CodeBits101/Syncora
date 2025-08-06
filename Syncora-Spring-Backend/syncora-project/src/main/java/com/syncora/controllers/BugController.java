package com.syncora.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.services.BugService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/bugs")
@Getter
@Setter
@AllArgsConstructor
@CrossOrigin
public class BugController {
   private final BugService bugService ; 
}
