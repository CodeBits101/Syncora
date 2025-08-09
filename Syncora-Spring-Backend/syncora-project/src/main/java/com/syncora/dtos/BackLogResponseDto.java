package com.syncora.dtos;

import java.util.List;

import com.syncora.services.TaskRespDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BackLogResponseDto {
  List<StoryResponseDto> stories ;; 
  List<BugRespDto> bugs ;  
  List<TaskRespDto> tasks;
}
