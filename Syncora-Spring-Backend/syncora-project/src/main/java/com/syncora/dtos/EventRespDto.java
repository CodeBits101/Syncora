package com.syncora.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EventRespDto extends BaseDto {
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime; // optional in response; null if not provided
    private LocalTime endTime;   // optional in response; null if not provided
    private Long projectId;
}


