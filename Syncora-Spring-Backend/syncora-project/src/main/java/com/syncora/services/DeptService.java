package com.syncora.services;

import java.util.List;
import java.util.Optional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.DeptDto;
import com.syncora.entities.Department;

public interface DeptService {

	List<DeptDto> getDepartments();

	ApiResponse addDepartment(DeptDto dto);

	DeptDto getDepartmentById(Long id);

}
