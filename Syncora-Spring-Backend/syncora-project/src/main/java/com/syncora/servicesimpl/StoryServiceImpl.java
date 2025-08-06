package com.syncora.servicesimpl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.syncora.repositories.StoryRepo;
import com.syncora.services.StoryServie;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class StoryServiceImpl implements StoryServie {
   private final StoryRepo storyRepo ;
}
