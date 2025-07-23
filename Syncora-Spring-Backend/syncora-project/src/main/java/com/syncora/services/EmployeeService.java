package com.syncora.services;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.dtos.EmployeeResponseDto;

public interface EmployeeService {

	ApiResponse registerUser(EmployeeReqDto dto);
	
	

}
