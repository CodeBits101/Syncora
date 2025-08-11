package com.syncora.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EventReqDto extends BaseDto {
    private String title;
    private String description; // optional
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime; // optional
    private LocalTime endTime;   // optional
    private Long projectId;
}


