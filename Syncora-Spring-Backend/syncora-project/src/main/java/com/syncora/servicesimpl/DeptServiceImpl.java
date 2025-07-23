package com.syncora.servicesimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.DeptDto;
import com.syncora.entities.Department;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.DeptRepo;
import com.syncora.services.DeptService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class DeptServiceImpl implements DeptService {
	
	private final DeptRepo deptRepo ; 
	private final ModelMapper modelMapper ; 
	
	@Override
	public List<DeptDto> getDepartments() {
		List<Department> deptList = deptRepo.findAll(); 
		if(deptList.size() == 0 ) throw new ResourceNotFoundException("There is no department till now...") ; 
		return deptList.stream().map(dept -> modelMapper.map(dept, DeptDto.class)).toList();
	}

	@Override
	public ApiResponse addDepartment(DeptDto dto) {
		Department dept = modelMapper.map(dto, Department.class); 
		deptRepo.save(dept) ; 
		return new ApiResponse("Department Added succesfully...");
	}

	@Override
	public DeptDto getDepartmentById(Long id) {
		Department dept  = deptRepo.findById(id).orElseThrow(()->
		      new ResourceNotFoundException("Dept does not exist")) ; 
		return modelMapper.map(dept, DeptDto.class);
	}

}
