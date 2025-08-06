package com.syncora.servicesimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.repositories.SprintRepo;
import com.syncora.services.SprintService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor

public class SprintServiceImpl implements SprintService {
     private final SprintRepo sprintRepo ; 
}
