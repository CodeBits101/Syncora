package com.syncora.repositories;

import com.syncora.dtos.CombinedReportDto;

public interface ProjectReportRepository {
	CombinedReportDto getSummaryData(Long projectId);

}
