package com.syncora.services;

import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.SubtaskReqDto;
import com.syncora.dtos.SubtasksRespDto;
import com.syncora.entities.SubTask;

public interface SubtaskService {

	ApiResponse createSubtask(SubtaskReqDto dto, Long id);

	List<SubtasksRespDto> getSubTasksByUserAndTask(Long createdById, Long taskId);

	List<SubtasksRespDto> getSubTasksByUserAndBug(Long createdById, Long bugId);

	ApiResponse deleteSubtask(Long id);

}
