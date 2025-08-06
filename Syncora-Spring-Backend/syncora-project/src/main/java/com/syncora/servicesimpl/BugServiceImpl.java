package com.syncora.servicesimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.repositories.BugRepo;
import com.syncora.services.BugService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Service
@Transactional
@Getter
@Setter
@AllArgsConstructor 

public class BugServiceImpl implements BugService {
   private final BugRepo bugRepo ;  
}
