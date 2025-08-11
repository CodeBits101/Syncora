package com.syncora.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.syncora.dtos.ApiResponse;
import com.syncora.dtos.EventReqDto;
import com.syncora.dtos.EventRespDto;
import com.syncora.services.EventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@CrossOrigin
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<EventRespDto>> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(eventService.getEventsByProject(projectId));
    }

    @GetMapping("/project/{projectId}/range")
    public ResponseEntity<List<EventRespDto>> getByProjectAndRange(
            @PathVariable Long projectId,
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(eventService.getEventsByProjectAndDateRange(projectId, start, end));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventRespDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getById(id));
    }

    @PostMapping
    public ResponseEntity<EventRespDto> create(@RequestBody EventReqDto dto) {
        return ResponseEntity.ok(eventService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventRespDto> update(@PathVariable Long id, @RequestBody EventReqDto dto) {
        return ResponseEntity.ok(eventService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.delete(id));
    }
}


