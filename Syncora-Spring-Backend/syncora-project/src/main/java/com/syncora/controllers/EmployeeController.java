package com.syncora.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.AuthResp;
import com.syncora.dtos.ChangePassDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.entities.Employee;
import com.syncora.enums.EmployeeType;
import com.syncora.security.JwtUtils;
import com.syncora.services.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
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
	
	@PutMapping("/changepassword")
	public ResponseEntity<?> changePassword(@RequestBody ChangePassDto dto ,Authentication authentication){
		String email = authentication.getName() ; 
		return ResponseEntity.ok(empService.changePassword(dto , email)) ;
	}
	
	@PutMapping("/updateProfile") 
	public ResponseEntity<?> updateProfile
	(@RequestBody EmployeeReqDto dto ,@RequestHeader("Authorization") String authHeader){
		Long userId = jwtUtils.getUserIdFromJwtToken(authHeader) ; 
		return ResponseEntity.ok(empService.updateProfile(dto , userId)) ;
	}
	
	
	@GetMapping("/byid")
	public ResponseEntity<?> getEmployeeById(HttpServletRequest req){
		String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
	    }
	    Long id = jwtUtils.getUserIdFromJwtToken(authHeader); 
		return ResponseEntity.ok(empService.getEmployeeById(id)) ;
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id){
		return ResponseEntity.ok(empService.deleteById(id)) ;
	}
	
	@GetMapping
	public ResponseEntity<?> getAllEmployees(){
		return ResponseEntity.ok(empService.getAllEmployees()) ;
	}
	
	@GetMapping("/team/{managerId}")
	public ResponseEntity<?> getTeamUnderManager(@PathVariable Long managerId){
		return ResponseEntity.ok(empService.getEmpsUnderManager(managerId));
	}
	
	
	
  
}
