package com.syncora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.syncora.entities.Bug;

public interface BugRepo extends JpaRepository<Bug, Long> {

}
