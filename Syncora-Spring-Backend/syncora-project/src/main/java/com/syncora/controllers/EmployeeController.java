package com.syncora.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.AuthResp;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.entities.Employee;
import com.syncora.enums.EmployeeType;
import com.syncora.security.JwtUtils;
import com.syncora.services.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/employees")
@AllArgsConstructor
@CrossOrigin
public class EmployeeController {
	
  private  AuthenticationManager authenticationManager;
  private final EmployeeService empService ;  
	private final JwtUtils jwtUtils;
  
  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody EmployeeReqDto dto){
	  return ResponseEntity.status(HttpStatus.CREATED).body(empService.registerUser(dto)) ; 
  }
  
	@PostMapping("/login")
	public ResponseEntity<?> userSignIn(
			@RequestBody AuthReqDto dto) {
		//1. Create Authentication Token 
		//(UsernamePasswordAuthToken - principal  , crendential)
		UsernamePasswordAuthenticationToken authentication=
				new UsernamePasswordAuthenticationToken
				(dto.getEmail(), dto.getPassword());
		System.out.println("before - "+authentication.isAuthenticated());//false);
		//2.  Invoke authenticate method of AuthenticationManager
		Authentication validAuthentication = 
				authenticationManager.authenticate(authentication);
		System.out.println(validAuthentication.getPrincipal().getClass());
		System.out.println(validAuthentication.getPrincipal());//UserEntity
		System.out.println("after "+validAuthentication.isAuthenticated());//tru
		//3. In case of success , generate JWT n send it to REST client
		  Employee userPrincipal = (Employee) validAuthentication.getPrincipal();
		  String token = jwtUtils.generateJwtToken(validAuthentication);
		  
		return ResponseEntity.ok(
				new AuthResp("auth successful"
						,jwtUtils.generateJwtToken(validAuthentication) , 
						userPrincipal.getAuthorities().iterator().next().getAuthority() , 
						userPrincipal.getEmpName() ,
						userPrincipal.getId()
						));
	}
	
	@GetMapping("/{role}")
	public ResponseEntity<?> getEmployeeByRole(@PathVariable EmployeeType role){
		return ResponseEntity.ok(empService.getEmployeeByRole(role)) ;
	}
  
}
