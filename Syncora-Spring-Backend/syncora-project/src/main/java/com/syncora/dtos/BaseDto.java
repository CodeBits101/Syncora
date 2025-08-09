package com.syncora.dtos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseDto {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id ; 
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime createdTimeStamp ; 
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedTimeStamp ; 
}
