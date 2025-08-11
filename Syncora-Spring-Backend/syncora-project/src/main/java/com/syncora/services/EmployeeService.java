package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.ChangePassDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.dtos.EmployeeResponseDto;
import com.syncora.dtos.EmpsForProjectRespDto;
import com.syncora.enums.EmployeeType;

public interface EmployeeService {

	ApiResponse registerUser(EmployeeReqDto dto);

	List<EmployeeResponseDto> getEmployeeByRole(EmployeeType role);

	ApiResponse changePassword(ChangePassDto dto , String email);

	EmployeeResponseDto getEmployeeById(Long id);

	ApiResponse deleteById(Long id);
	
	List<EmployeeResponseDto> getAllEmployees() ;

	ApiResponse updateProfile(EmployeeReqDto dto, Long userId);  
	List<EmployeeResponseDto> getEmpsUnderManager(Long managerId);  
	
	List<EmpsForProjectRespDto> getEmpsNotAssingedToProject(List<EmployeeType> excludedRoles);
	
	List<EmpsForProjectRespDto> getEmployeesByProject(Long ProjectId);
	
	

}
