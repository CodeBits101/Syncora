package com.syncora.servicesimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.EventReqDto;
import com.syncora.dtos.EventRespDto;
import com.syncora.entities.Event;
import com.syncora.entities.Project;
import com.syncora.exceptions.ResourceNotFoundException;
import com.syncora.repositories.EventRepo;
import com.syncora.repositories.ProjectRepo;
import com.syncora.services.EventService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepo eventRepo;
    private final ProjectRepo projectRepo;
    

    @Override
    public List<EventRespDto> getEventsByProject(Long projectId) {
        return eventRepo.findByProject_Id(projectId)
                .stream()
                .map(this::toResp)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventRespDto> getEventsByProjectAndDateRange(Long projectId, LocalDate startDate, LocalDate endDate) {
        return eventRepo
                .findByProject_IdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(projectId, endDate, startDate)
                .stream()
                .map(this::toResp)
                .collect(Collectors.toList());
    }

    @Override
    public EventRespDto getById(Long id) {
        Event event = eventRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        return toResp(event);
    }

    @Override
    public EventRespDto create(EventReqDto dto) {
        Project project = projectRepo.findById(dto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        Event event = new Event();
        apply(event, dto);
        event.setProject(project);
        return toResp(eventRepo.save(event));
    }

    @Override
    public EventRespDto update(Long id, EventReqDto dto) {
        Event event = eventRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        apply(event, dto);
        return toResp(eventRepo.save(event));
    }

    @Override
    public ApiResponse delete(Long id) {
        Event event = eventRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Event not found"));
        eventRepo.delete(event);
        return new ApiResponse("Event deleted");
    }

    private void apply(Event event, EventReqDto dto) {
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        // persist only dates; times are accepted in request but not stored in entity
        event.setStartDate(dto.getStartDate());
        event.setEndDate(dto.getEndDate());
    }

    private EventRespDto toResp(Event event) {
        EventRespDto resp = new EventRespDto();
        resp.setId(event.getId());
        resp.setTitle(event.getTitle());
        resp.setDescription(event.getDescription());
        resp.setStartDate(event.getStartDate());
        resp.setEndDate(event.getEndDate());
        // times are not persisted; they remain null in response
        resp.setProjectId(event.getProject().getId());
        resp.setCreatedTimeStamp(event.getCreatedTimeStamp());
        resp.setUpdatedTimeStamp(event.getUpdatedTimeStamp());
        return resp;
    }
}


