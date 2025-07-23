package com.syncora.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.syncora.enums.EmployeeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name ="employees")
public class Employee extends Base implements UserDetails {
	@Column(name="emp_name" , length  = 50 , nullable = false)
  private String empName;
	@Column(name ="email" , length = 100 , nullable = false , unique =  true)
  private String email ;  
	@Column(name ="password" , length = 100  , nullable = false)
  private String password ;  
	@Column(name ="phone_number" , length =15 , nullable = false)
  private String phoneNumber ; 
	
	@ManyToOne
	@JoinColumn(name="dept_id")
  private Department department ;
	@ManyToOne
	@JoinColumn(name="manager_id")
  private Employee manager ;
	@ManyToOne
	@JoinColumn(name ="project_id")
  private Project project ;  
	@Column(name="date_of_joining")
  private LocalDateTime doj;
	@Enumerated(EnumType.STRING)
	@Column(name="emp_role")
  private EmployeeType empRole ;
	
	
	
	public Employee(String empName, String email, String password, String phoneNumber, Department department,
			Employee manager, Project project, LocalDateTime doj, EmployeeType empRole) {
		super();
		this.empName = empName;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.department = department;
		this.manager = manager;
		this.project = project;
		this.doj = doj;
		this.empRole = empRole;
	}
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority
				(this.empRole.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}

	
	
}
