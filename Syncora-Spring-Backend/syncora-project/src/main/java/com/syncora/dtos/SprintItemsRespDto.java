package com.syncora.dtos;

import java.util.List;

import com.syncora.services.TaskRespDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SprintItemsRespDto {
    private Long sprintId;
    private List<BugRespDto> bugs;
    private List<TaskRespDto> tasks;
    private List<StoryResponseDto> stories;
}


