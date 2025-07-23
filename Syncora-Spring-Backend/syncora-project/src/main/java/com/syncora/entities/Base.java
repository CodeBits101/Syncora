package com.syncora.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor

public class Base {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	@CreationTimestamp
	@Column(updatable = false)
	private LocalDateTime createdTimeStamp ; 
	
	@UpdateTimestamp
	private LocalDateTime updatedTimeStamp  ; 
}
