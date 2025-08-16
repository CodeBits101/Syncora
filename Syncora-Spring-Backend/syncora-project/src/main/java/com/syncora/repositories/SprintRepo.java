package com.syncora.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.syncora.dtos.SprintSummaryDto;
import com.syncora.entities.Sprint;
import com.syncora.enums.SprintStatus;

public interface SprintRepo extends JpaRepository<Sprint, Long> {

	List<Sprint> findByProject_Id(Long ProjectId);

	boolean existsByProjectIdAndSprintStatus(Long projectId, SprintStatus active);
   	
	@Query("""
		    SELECT new com.syncora.dtos.SprintSummaryDto(
			    s.id,
		        s.sprintName,
		        s.description,
		        COUNT(st),
		        COUNT(t),
		        COUNT(sub),
		        COUNT(b),
		        s.actualStartDate,
		        s.actualEndDate
		    )
		    FROM Sprint s
		    LEFT JOIN s.stories st
		    LEFT JOIN s.tasks t
		    LEFT JOIN t.subTasks sub
		    LEFT JOIN s.bugs b
		    WHERE s.project.id = :projectId
		    GROUP BY s.id, s.sprintName, s.description, s.actualStartDate, s.actualEndDate
		""")
		List<SprintSummaryDto> findSprintDetailsByProjectId(@Param("projectId") Long projectId);

}
