package com.syncora.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
public class CommonEntity extends Base {
	
    @Column(nullable = false, length = 50)
	private String title;
    
    @Column(length = 300)
    private String description;
	
	@Column(name ="start_date")
	private LocalDateTime startDate;
	
	@Column(name="end_date")
	private LocalDateTime endDate;
	
	@Column(name="actual_start_date")
	private LocalDateTime actualStartDate;
	
	@Column(name="actual_end_date")
	private LocalDateTime actualEndDate; 

}
