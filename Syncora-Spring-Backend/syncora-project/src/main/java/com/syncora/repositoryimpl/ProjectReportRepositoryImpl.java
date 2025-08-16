package com.syncora.repositoryimpl;

import org.springframework.stereotype.Repository;

import com.syncora.dtos.CombinedReportDto;
import com.syncora.dtos.ProjectBugsSummaryDto;
import com.syncora.dtos.ProjectStoriesSummaryDto;
import com.syncora.dtos.ProjectSummaryDto;
import com.syncora.dtos.ProjectTasksSummaryDto;
import com.syncora.dtos.SprintCountDto;
import com.syncora.repositories.ProjectReportRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProjectReportRepositoryImpl implements ProjectReportRepository {

    @PersistenceContext
    private final EntityManager em;

    @Override
    public CombinedReportDto getSummaryData(Long projectId) {
        Object[] row = (Object[]) em.createQuery("""
            SELECT 
                COALESCE(SUM(CASE WHEN s.sprintStatus = 'COMPLETED' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN s.sprintStatus = 'BACKLOG' THEN 1 ELSE 0 END), 0),

                COALESCE(SUM(CASE WHEN st.storyStatus = 'BACKLOG' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN st.storyStatus = 'TODO' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN st.storyStatus = 'INPROGRESS' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN st.storyStatus = 'TESTING' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN st.storyStatus = 'DEPLOYMENT' THEN 1 ELSE 0 END), 0),

                COALESCE(SUM(CASE WHEN t.status = 'BACKLOG' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN t.status = 'TODO' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN t.status = 'INPROGRESS' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN t.status = 'TESTING' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN t.status = 'DEPLOYMENT' THEN 1 ELSE 0 END), 0),

                COALESCE(SUM(CASE WHEN b.status = 'BACKLOG' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN b.status = 'TODO' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN b.status = 'INPROGRESS' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN b.status = 'TESTING' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN b.status = 'DEPLOYMENT' THEN 1 ELSE 0 END), 0)
            FROM Project p
            LEFT JOIN p.sprints s
            LEFT JOIN p.stories st
            LEFT JOIN st.tasks t
            LEFT JOIN st.bugs b
            WHERE p.id = :projectId
        """)
        .setParameter("projectId", projectId)
        .getSingleResult();

        SprintCountDto sprintCounts = new SprintCountDto(
            ((Number) row[0]).longValue(),
            ((Number) row[1]).longValue()
        );

        ProjectStoriesSummaryDto stories = new ProjectStoriesSummaryDto(
            ((Number) row[2]).longValue(),
            ((Number) row[3]).longValue(),
            ((Number) row[4]).longValue(),
            ((Number) row[5]).longValue(),
            ((Number) row[6]).longValue()
        );

        ProjectTasksSummaryDto tasks = new ProjectTasksSummaryDto(
            ((Number) row[7]).longValue(),
            ((Number) row[8]).longValue(),
            ((Number) row[9]).longValue(),
            ((Number) row[10]).longValue(),
            ((Number) row[11]).longValue()
        );

        ProjectBugsSummaryDto bugs = new ProjectBugsSummaryDto(
            ((Number) row[12]).longValue(),
            ((Number) row[13]).longValue(),
            ((Number) row[14]).longValue(),
            ((Number) row[15]).longValue(),
            ((Number) row[16]).longValue()
        );

        return new CombinedReportDto(sprintCounts, new ProjectSummaryDto(stories, tasks, bugs));
    }
}
