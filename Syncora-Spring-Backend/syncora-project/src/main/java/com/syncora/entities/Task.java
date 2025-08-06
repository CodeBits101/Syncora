package com.syncora.entities;

import java.util.ArrayList;
import java.util.List;

import com.syncora.enums.TaskPriority;
import com.syncora.enums.TaskStatus;

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
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tasks")
@AttributeOverrides({

@AttributeOverride(name = "title", column = @Column(name = "task_title")),
@AttributeOverride(name = "description", column = @Column(name = "task_description"))

})
public class Task extends CommonEntity{
	
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    
    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private Employee assignedTo;
    
    @ManyToOne
    @JoinColumn(name = "assigned_by_id")
    private Employee assignedBy;
    
    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private Employee createdBy;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;
    
	@ManyToOne
	@JoinColumn(name="story_id")
	private Story story;
    
	private int debugCount;
	private int storyPoint;
	private boolean debugFlag;
	private boolean testingFlag;
		
	@OneToMany(mappedBy = "task",  cascade = CascadeType.ALL , orphanRemoval = true)
	private List<SubTask> subTasks = new ArrayList<>();	
	
	
}



