import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  LinearProgress,
  Divider,
  Avatar
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationTooltip,
  AccumulationLegend,
  AccumulationDataLabel,
} from '@syncfusion/ej2-react-charts';
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  RangesDirective,
  RangeDirective,
  PointersDirective,
  PointerDirective,
  GaugeTooltip,
  Annotations,
} from '@syncfusion/ej2-react-circulargauge';
import { getProjectDetails } from '../../services/manager/manager';

const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    style={{ height: '100%', overflow: 'hidden' }}
  >
    {value === index && <Box sx={{ p: 0, height: '100%' }}>{children}</Box>}
  </div>
);

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProjectDetails({projectId: propProjectId}) {
  const { projectId: routeProjectId } = useParams();
  const navigate = useNavigate();
  const projectId = propProjectId || routeProjectId;
  const [value, setValue] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;
      try {
        const res = await getProjectDetails(projectId);
        setData(res);
      } catch (err) {
        console.error('Error fetching project details:', err);
      }
    };
    if (projectId) fetchData();
  }, [projectId]);

  const handleChange = (event, newValue) => setValue(newValue);

  if (!data) {
    return <Typography sx={{ p: 2 }}>Loading...</Typography>;
  }

  const {
    project,
    sprintCounts,
    summary,
    currentSprintSummary,
    inProgressTasks,
    sprintDetails,
    projectProgress,
    empStats,
  } = data;

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  const Section = ({ title, bg, children }) => (
    <Paper
      elevation={4}
      sx={{
        background: `linear-gradient(135deg, ${bg} 0%, #ffffff 100%)`,
        color: '#222',
        position: 'relative',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: bg,
          px: 1.5,
          py: 0.5,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body1" fontWeight={700} sx={{ color: '#333' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, p: 1, height: '100%' }}>
        {children || <Typography variant="body2">No data available</Typography>}
      </Box>
    </Paper>
  );

  const GaugeChart = () => (
    <Section title="Overall Project Progress" bg="#d1e8ff">
      <CircularGaugeComponent background="transparent" width="100%" height="100%">
        <Inject services={[GaugeTooltip, Annotations]} />
        <AxesDirective>
          <AxisDirective
            minimum={0}
            maximum={100}
            radius="100%"
            startAngle={270}
            endAngle={90}
            majorTicks={{ interval: 10, height: 10, position: 'Inside' }}
            minorTicks={{ height: 0 }}
            labelStyle={{ offset: 5, font: { size: '12px', color: '#444' } }}
            lineStyle={{ width: 0 }}
          >
            <PointersDirective>
              <PointerDirective
                value={projectProgress || 0}
                radius="85%"
                color="#4B8DF8"
                pointerWidth={10}
                cap={{
                  radius: 8,
                  color: '#4B8DF8',
                  border: { color: '#4B8DF8', width: 1 },
                }}
                needleTail={{ length: '20%', color: '#4B8DF8' }}
                animation={{ enable: true, duration: 1000 }}
              />
            </PointersDirective>
            <RangesDirective>
              <RangeDirective
                start={0}
                end={projectProgress || 0}
                color="#4B8DF8"
                startWidth={10}
                endWidth={10}
                radius="85%"
              />
            </RangesDirective>
          </AxisDirective>
        </AxesDirective>
      </CircularGaugeComponent>
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 600,
          fontSize: '16px',
          color: '#333',
        }}
      >
        {projectProgress || 0}% Complete
      </div>
    </Section>
  );

  const ProjectDetailsContent = () => {
    if (!project) return <Typography>No data available</Typography>;

    const details = [
      { label: 'Project Name', value: project.title },
      { label: 'Description', value: project.description },
      { label: 'Project Code', value: project.projectCode },
      { label: 'Status', value: project.projectStatus },
      { label: 'Manager', value: project.managerName },
      { label: 'Employee Count', value: empStats?.length || 0 },
      { label: 'Start Date', value: formatDate(project.startDate) },
      { label: 'End Date', value: formatDate(project.endDate) },
      { label: 'Sprints Completed', value: sprintCounts?.completed },
      { label: 'Sprints Backlog', value: sprintCounts?.backlog },
      { label: 'Completed Tasks', value: summary?.tasks?.deployment || 0 },
      { label: 'Completed Stories', value: summary?.stories?.deployment || 0 },
      {
        label: 'Open Bugs',
        value:
          Object.values(summary?.bugs || {}).reduce((a, b) => a + b, 0) -
          (summary?.bugs?.deployment || 0),
      },
      { label: 'Closed Bugs', value: summary?.bugs?.deployment || 0 },
    ];

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          px: 1,
        }}
      >
        {Array.from({ length: Math.ceil(details.length / 2) }).map((_, colIdx) => {
          const colItems = details.slice(colIdx * 2, colIdx * 2 + 2);
          return (
            <Box
              key={colIdx}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flexShrink: 0,
                width: 200,
              }}
            >
              {colItems.map((info, idx) => (
                <Paper
                  key={idx}
                  elevation={3}
                  sx={{
                    p: 2,
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    textAlign: "center",
                    minHeight: 90,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {info.label}
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {info.value}
                  </Typography>
                </Paper>
              ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  const SprintSummary = () => {
    const navigate = useNavigate();

    if (!sprintDetails || !Array.isArray(sprintDetails) || sprintDetails.length === 0) {
      return <Typography>No data available</Typography>;
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          overflowX: "auto",
          py: 1,
          px: 1,
        }}
      >
        {sprintDetails.map((sprint, idx) => (
          <Paper
            key={idx}
            elevation={4}
            sx={{
              minWidth: 280,
              maxWidth: 320,
              borderRadius: 3,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: "#e3f2fd",
                px: 2,
                py: 1.2,
              }}
            >
              <Typography variant="h6" fontWeight={600} color="primary">
                {sprint.sprintName}
              </Typography>
            </Box>

            {/* Body */}
            <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  wordBreak: "break-word",
                }}
              >
                {sprint.description}
              </Typography>

              {/* Stats in 2 rows */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2">📘 <b>Stories:</b> {sprint.storiesCount}</Typography>
                <Typography variant="body2">📘 <b>Tasks:</b> {sprint.tasksCount}</Typography>
                <Typography variant="body2">📘 <b>SubTasks:</b> {sprint.subTasksCount}</Typography>
                <Typography variant="body2">🐞 <b>Bugs:</b> {sprint.bugsCount}</Typography>
              </Box>

              <Divider sx={{ my: 1 }} />
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() =>
                  navigate("/manager/sprints", { state: { projectId: project.id } })
                }
                sx={{ mt: "auto" }}
              >
                View Details
              </Button>

            </Box>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f6f8',
        p: 1,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Project Details" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CustomTabPanel value={value} index={0}>
          <Grid
            container
            spacing={0.5}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridTemplateRows: '30% 35% 35%',
              height: '100%',
              gap: 1,
            }}
          >
            {/* Project details */}
            <Box sx={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}>
              <Section title="Project Details" bg="#fce4ec">
                <ProjectDetailsContent />
              </Section>
            </Box>

            <Box sx={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
              <Section title="In Progress Tasks" bg="#e8f5e9">
                {inProgressTasks?.length ? (
                  inProgressTasks.map((task, idx) => (
                    <Paper key={idx} elevation={3} sx={{ p: 1, mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Assigned to: {task.assignedTo || 'N/A'}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography>No current in progress tasks</Typography>
                )}
              </Section>
            </Box>

            <Box sx={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
              <Section title="Project Tasks Summary" bg="#fff3e0">
                {summary?.tasks &&
                  Object.values(summary.tasks).reduce((a, b) => a + b, 0) > 0 ? (
                  <AccumulationChartComponent
                    height="100%"
                    width="100%"
                    tooltip={{ enable: true }}
                    legendSettings={{ visible: true }}
                  >
                    <Inject
                      services={[
                        PieSeries,
                        AccumulationTooltip,
                        AccumulationLegend,
                        AccumulationDataLabel,
                      ]}
                    />
                    <AccumulationSeriesCollectionDirective>
                      <AccumulationSeriesDirective
                        dataSource={Object.entries(summary.tasks).map(
                          ([x, y]) => ({ x, y })
                        )}
                        xName="x"
                        yName="y"
                        radius="80%"
                        explode
                        dataLabel={{
                          visible: true,
                          position: 'Outside',
                          name: 'x',
                        }}
                      />
                    </AccumulationSeriesCollectionDirective>
                  </AccumulationChartComponent>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Section>
            </Box>

            <Box sx={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
              <Section title="Current Sprint Tasks Summary" bg="#e3f2fd">
                {currentSprintSummary &&
                  Object.values(currentSprintSummary).reduce((a, b) => a + b, 0) > 0 ? (
                  <AccumulationChartComponent
                    height="100%"
                    width="100%"
                    tooltip={{ enable: true }}
                    legendSettings={{ visible: true }}
                  >
                    <Inject
                      services={[
                        PieSeries,
                        AccumulationTooltip,
                        AccumulationLegend,
                        AccumulationDataLabel,
                      ]}
                    />
                    <AccumulationSeriesCollectionDirective>
                      <AccumulationSeriesDirective
                        dataSource={Object.entries(currentSprintSummary).map(([key, val]) => {
                          const labelMap = {
                            sprintBacklogTasks: "Backlog",
                            sprintTodoTasks: "To Do",
                            sprintInprogressTasks: "In Progress",
                            sprintTestingTasks: "Testing",
                            sprintDeploymentTasks: "Deployment",
                          };
                          return { x: labelMap[key] || key, y: val };
                        })}
                        xName="x"
                        yName="y"
                        radius="80%"
                        explode
                        dataLabel={{
                          visible: true,
                          position: "Inside",
                          name: "x",
                        }}
                      />
                    </AccumulationSeriesCollectionDirective>
                  </AccumulationChartComponent>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Section>
            </Box>


            <Box sx={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
              <GaugeChart />
            </Box>

            <Box sx={{ gridColumn: '1 / 4', gridRow: '3 / 4' }}>
              <Section title="Sprints Summary" bg="#e0f7fa">
                <SprintSummary />
              </Section>
            </Box>

            <Box sx={{ gridColumn: '4 / 5', gridRow: '1 / 4' }}>
              <Section title="Employee Stats" bg="#ffebee">
                {empStats?.length ? (
                  empStats.map((emp, idx) => (
                    <Paper
                      key={idx}
                      elevation={3}
                      sx={{
                        p: 1.5,
                        mb: 1.5,
                        borderRadius: 2,
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {/* Top row: Avatar + Name */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{ bgcolor: "#1976d2", width: 32, height: 32, fontSize: "0.9rem" }}
                        >
                          {emp.empName?.[0] || "E"}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {emp.empName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Joined: {formatDate(emp.doj)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Performance */}
                      <Box>
                        <LinearProgress
                          variant="determinate"
                          value={emp.performance || 0}
                          sx={{ height: 6, borderRadius: 1, mb: 0.5 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Performance: <b>{emp.performance || 0}%</b>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="body2" color="success.main">
                          ✅ Completed: <b>{emp.completedCount || 0}</b>
                        </Typography>
                        <Typography variant="body2" color="error.main">
                          ⏳ Pending: <b>{emp.pendingCount || 0}</b>
                        </Typography>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Section>
            </Box>


          </Grid>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
