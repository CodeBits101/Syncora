package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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

import com.syncora.dtos.BugReqDto;
import com.syncora.dtos.TaskReqDto;
import com.syncora.enums.TaskStatus;
import com.syncora.security.JwtUtils;
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
   
   private final JwtUtils jwtUtils;
   private AuthenticationManager authenticationManager;
   private final BugService bugService;
   
   @PostMapping("/add")
   public ResponseEntity<?> createBug(@RequestBody BugReqDto dto, @RequestHeader("Authorization") String authHeader) {
       Long id = jwtUtils.getUserIdFromJwtToken(authHeader);
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.createBug(dto, id));
   }
   
   @PutMapping("/update/{id}")
   public ResponseEntity<?> updateBug
   (@RequestBody BugReqDto dto ,@PathVariable Long id) { 
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.updateBug(dto ,id)) ; 
   }
   
   @PutMapping("/{changestatus}/{id}")
   public ResponseEntity<?> changeStatus
   (@PathVariable TaskStatus changestatus ,@PathVariable Long id) { 
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.changeStatus(changestatus ,id)) ; 
   }
   
   @GetMapping("/getbugbystatus/{id}")
   public ResponseEntity<?> getBugByStatus
   (@PathVariable Long id) { 
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.getBugByStatus(id)) ; 
   }
   
   @GetMapping("/{id}")
   public ResponseEntity<?> getBugById
   (@PathVariable Long id) { 
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.getBugById(id)) ; 
   }
   
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteBug(@PathVariable Long id) {
       return ResponseEntity.status(HttpStatus.CREATED).body(bugService.deleteBug(id)) ; 
   }
}
