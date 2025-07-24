package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.dtos.EmployeeResponseDto;
import com.syncora.enums.EmployeeType;

public interface EmployeeService {

	ApiResponse registerUser(EmployeeReqDto dto);

	List<EmployeeResponseDto> getEmployeeByRole(EmployeeType role);
	
	

}
