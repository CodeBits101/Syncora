package com.syncora.entities;

import java.time.LocalDateTime;

import com.syncora.enums.TaskStatus;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "subtasks")

public class SubTask extends Base {

    @Column(nullable = false, length = 100)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bug_id")
    private Bug bug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Employee createdBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    @Column(length = 255)
    private String description;

	@Column(name ="start_date")
	private LocalDateTime startDate;
	
	@Column(name="end_date")
	private LocalDateTime endDate;

    @PrePersist
    @PreUpdate
    private void validateParent() {
        if ((task == null && bug == null) || (task != null && bug != null)) {
            throw new IllegalStateException("SubTask must be linked to either a Task or a Bug, but not both.");
        }
    }
}

