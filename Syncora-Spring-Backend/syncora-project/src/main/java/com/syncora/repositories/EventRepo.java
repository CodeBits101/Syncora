package com.syncora.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Event;

public interface EventRepo extends JpaRepository<Event, Long> {
    List<Event> findByProject_Id(Long projectId);

    // Events overlapping the given date range
    List<Event> findByProject_IdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long projectId,
            LocalDate endInclusive,
            LocalDate startInclusive);
}


