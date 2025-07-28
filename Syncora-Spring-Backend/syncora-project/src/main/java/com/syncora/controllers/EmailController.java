package com.syncora.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.EmailRequestDto;
import com.syncora.servicesimpl.EmailService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/mail")
@AllArgsConstructor
public class EmailController {
 private final  EmailService emailService; 
 
 
 @PostMapping("/send")
 public ApiResponse sendEmail(@RequestBody EmailRequestDto request) {
     emailService.sendSimpleMessage(request.getTo(), request.getSubject(), request.getBody());
     return new ApiResponse("Email sent successfully!");
 }
}
