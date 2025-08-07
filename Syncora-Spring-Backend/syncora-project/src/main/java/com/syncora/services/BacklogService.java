package com.syncora.services;

import java.util.List;

import com.syncora.dtos.BacklogItemDto;

public interface BacklogService {

	List<BacklogItemDto> getBacklogItems();
}
