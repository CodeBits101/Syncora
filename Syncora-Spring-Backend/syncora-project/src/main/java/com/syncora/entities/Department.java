package com.syncora.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "departments")
public class Department extends Base {
	
@Column(name = "dept_name" , length = 50 , nullable = false , unique = true )
private String deptName ; 
}
