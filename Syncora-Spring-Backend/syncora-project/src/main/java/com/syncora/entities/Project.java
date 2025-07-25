package com.syncora.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.syncora.enums.ProjectStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "projects")
public class Project extends Base {
	@Column(name = "project_name" , length  = 50 ,nullable = false)
  private String projectName; 
	@Column(name ="project_description" , length= 100)
  private String description ; 
	@Column(name ="start_date")
  private LocalDateTime startDate ;
	@Column(name="end_date")
  private LocalDateTime endDate ;
	@Column(name="actual_start_date")
  private LocalDateTime actualStartDate; 
	@Column(name="actual_end_date")
  private LocalDateTime actualEndDate ; 
	@Enumerated(EnumType.STRING)
	@Column(name ="status" , nullable = false )
  private ProjectStatus projectStatus ; 
	@Column(name="p_code")
  private String projectCode ;  
	@ManyToOne
	@JoinColumn(name ="manager_id")
	private Employee manager ;
	
	@OneToMany(mappedBy = "project" , cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Employee> empList = new ArrayList<>();
  
  
  @PrePersist
  private void generateProjectCode() {
      this.projectCode = "PROJ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
  }
  
}
