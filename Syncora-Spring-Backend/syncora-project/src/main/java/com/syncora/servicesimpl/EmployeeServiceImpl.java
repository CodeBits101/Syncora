package com.syncora.servicesimpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.DeptDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.dtos.EmployeeResponseDto;
import com.syncora.entities.Department;
import com.syncora.entities.Employee;
import com.syncora.exceptions.ApiException;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.DeptRepo;
import com.syncora.repositories.EmployeeRepo;
import com.syncora.services.EmployeeService;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
	
	private final EmployeeRepo empRepo ; 
	private final DeptRepo deptRepo ;
    private PasswordEncoder passwordEncoder ; 
	private ModelMapper modelMapper;
	
	
	
	
	
	@Override
	public ApiResponse registerUser(EmployeeReqDto dto) {
		
		if(empRepo.existsByEmail(dto.getEmail())) 
			throw new ApiException("Duplicate email found") ; 
		
		Employee emp  = modelMapper.map(dto, Employee.class) ; 
		emp.setPassword(passwordEncoder.
				encode(emp.getPassword()));
		emp.setDepartment(deptRepo.findById(dto.getDepartmentId())
				.orElseThrow(()-> new ResourceNotFoundException("Dept does not exist")));
		emp.setManager(empRepo.findById(dto.getManagerId())
				.orElseThrow(()-> new ResourceNotFoundException("Manager does not exist")));
		empRepo.save(emp); 
		return new ApiResponse("Employee Registered successfully");
	}


 
}
