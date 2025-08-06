package com.syncora.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.syncora.enums.ProjectStatus;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
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
@AttributeOverrides({
@AttributeOverride(name = "title", column = @Column(name = "project_title")),
@AttributeOverride(name = "description", column = @Column(name = "project_description"))
})
public class Project extends CommonEntity {
	@Enumerated(EnumType.STRING)
	@Column(name ="status" , nullable = false )
  private ProjectStatus projectStatus ; 
	@Column(name="p_code")
  private String projectCode ;  
	@ManyToOne
	@JoinColumn(name ="manager_id")
	private Employee manager ;
	
	@OneToMany(mappedBy = "project" , cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private List<Employee> empList = new ArrayList<>();
	
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Story> stories = new ArrayList<>();
	
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Sprint> sprints = new ArrayList<>();
  
  
  @PrePersist
  private void generateProjectCode() {
      this.projectCode = "PROJ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
  }
  
}
