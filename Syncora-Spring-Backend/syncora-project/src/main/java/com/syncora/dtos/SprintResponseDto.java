package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.syncora.enums.SprintStatus;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SprintResponseDto {
    private Long id;
    private String sprintName;
    private Long projectId;
    private String description;
    private LocalDateTime StartDate;
    private LocalDateTime EndDate;
    private Long managerId;
    private Set<Long> storyIds;
    private List<Long> taskIds;
    private List<Long> bugIds;
    private SprintStatus sprintStatus;
}
