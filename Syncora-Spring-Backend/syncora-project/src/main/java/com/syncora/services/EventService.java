package com.syncora.services;

import java.time.LocalDate;
import java.util.List;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.EventReqDto;

public interface EventService {
    List<com.syncora.dtos.EventRespDto> getEventsByProject(Long projectId);
    List<com.syncora.dtos.EventRespDto> getEventsByProjectAndDateRange(Long projectId, LocalDate startDate, LocalDate endDate);
    com.syncora.dtos.EventRespDto getById(Long id);
    com.syncora.dtos.EventRespDto create(EventReqDto dto);
    com.syncora.dtos.EventRespDto update(Long id, EventReqDto dto);
    ApiResponse delete(Long id);
}


