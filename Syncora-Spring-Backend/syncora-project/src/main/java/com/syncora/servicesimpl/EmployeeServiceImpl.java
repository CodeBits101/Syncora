package com.syncora.servicesimpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.AuthReqDto;
import com.syncora.dtos.ChangePassDto;
import com.syncora.dtos.DeptDto;
import com.syncora.dtos.EmployeeReqDto;
import com.syncora.dtos.EmployeeResponseDto;
import com.syncora.entities.Department;
import com.syncora.entities.Employee;
import com.syncora.enums.EmployeeType;
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
		
		if((dto.getEmpRole().name()  == "ROLE_MANAGER") || (dto.getEmpRole().name() == "ROLE_ADMIN")) {
		   emp.setManager(emp);	
		   
		}
		else {
			emp.setManager(empRepo.findById(dto.getManagerId())
					.orElseThrow(()-> new ResourceNotFoundException("Manager does not exist")));
		}
		
		emp.setPassword(passwordEncoder.
				encode(emp.getPassword()));
		emp.setDepartment(deptRepo.findById(dto.getDepartmentId())
				.orElseThrow(()-> new ResourceNotFoundException("Dept does not exist")));
		
		empRepo.save(emp); 
		return new ApiResponse("Employee Registered successfully");
	}





	@Override
	public List<EmployeeResponseDto> getEmployeeByRole(EmployeeType role) {
		List<EmployeeResponseDto> empList = empRepo.findByEmpRole(role).stream()
			    .map(emp -> {
			        EmployeeResponseDto dto = modelMapper.map(emp, EmployeeResponseDto.class);
			        
			        // Set department name if available
			        if (emp.getDepartment() != null) {
			            dto.setDepartName(emp.getDepartment().getDeptName());
			        }

			        // Set manager name if available
			        if (emp.getManager() != null) {
			            dto.setManagerName(emp.getManager().getEmpName());
			        }

			        return dto;
			    }).toList();
		
		return empList;
	}





	@Override
	public ApiResponse changePassword(ChangePassDto dto, String email) {
		Employee emp = empRepo.findByEmail(email)
				.orElseThrow(()-> new ResourceNotFoundException("User does not exist")) ; 
		
		 if (!passwordEncoder.matches(dto.getCurrentPassword(), emp.getPassword()))
			throw new ResourceNotFoundException("Password is incorrect") ; 
		 emp.setPassword(passwordEncoder.
					encode(dto.getNewPassword()));
		empRepo.save(emp) ; 
		return new ApiResponse("Password Updated Successfully");
	}





	@Override
	public EmployeeResponseDto getEmployeeById(Long id) {
		Employee emp = empRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("User doesn't exist with this id")) ; 
		EmployeeResponseDto resp  = modelMapper.map(emp, EmployeeResponseDto.class) ;
		if(emp.getDepartment()!=null) {
			resp.setDepartName(emp.getDepartment().getDeptName());	
		}
		if(emp.getManager() !=null)
			resp.setManagerName(emp.getManager().getEmpName());	
		
		return resp;
	}





	@Override
	public ApiResponse deleteById(Long id) {
		if(!empRepo.existsById(id))
			throw new ResourceNotFoundException("Employee does not exist") ; 
		empRepo.deleteById(id);
		return new ApiResponse("Employee Deleted Successfully");
	}





	@Override
	public List<EmployeeResponseDto> getAllEmployees() {
		List<EmployeeResponseDto> empList = empRepo.findAll().stream()
			    .map(emp -> {
			        EmployeeResponseDto dto = modelMapper.map(emp, EmployeeResponseDto.class);
			        
			        // Set department name if available
			        if (emp.getDepartment() != null) {
			            dto.setDepartName(emp.getDepartment().getDeptName());
			        }

			        // Set manager name if available
			        if (emp.getManager() != null) {
			            dto.setManagerName(emp.getManager().getEmpName());
			        }

			        return dto;
			    }).toList();
		
		return empList;

	}





	@Override
	public ApiResponse updateProfile(EmployeeReqDto dto, Long userId) {
		Employee emp  = empRepo.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("Employee not found with the given mail")) ;
		modelMapper.map(dto, emp) ; 
		empRepo.save(emp) ; 
		
		return new ApiResponse("Employee Updated successfully");
	}





	


 
}
