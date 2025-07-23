package com.syncora.security;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.entities.Employee;
import com.syncora.repositories.EmployeeRepo;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class CustomerUserServiceImpl implements UserDetailsService {
    
	private EmployeeRepo employeeRepo ; 
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Employee emp  = employeeRepo.findByEmail(email)
				.orElseThrow(()-> new UsernameNotFoundException("Invalid Email !!!")) ; 
		return (UserDetails) emp;
	}

}
