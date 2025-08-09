// (already present) imports...
import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Paper,
  Avatar,
  LinearProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

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

// Mock data
const pieData = [
  { x: 'Completed', y: 40 },
  { x: 'In Progress', y: 25 },
  { x: 'Hold', y: 15 },
  { x: 'Planned', y: 20 },
];


const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
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
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const inProgressTasks = [
  { name: 'Design Wireframes' },
  { name: 'Implement Login Page' },
  { name: 'Integrate Auth API' },
  { name: 'Build Dashboard Layout' },
];

const employees = [
  { name: 'John Doe', joined: '2025-01-15', completed: 24, overdue: 2 },
  { name: 'Jane Smith', joined: '2025-03-10', completed: 30, overdue: 5 },
  { name: 'Alice Johnson', joined: '2025-02-20', completed: 128, overdue: 14 },
  { name: 'Michael Brown', joined: '2025-04-05', completed: 220, overdue: 14 },
  { name: 'Sunny Brown', joined: '2025-04-05', completed: 20, overdue: 4 },
  { name: 'John Brown', joined: '2025-04-05', completed: 20, overdue: 4 },
  { name: 'Pale Brown', joined: '2025-04-05', completed: 20, overdue: 4 },
  { name: 'Don Brown', joined: '2025-04-05', completed: 20, overdue: 4 },
];

const sprintPlans = [
  {
    name: 'Sprint Alpha',
    description: 'Initial backend setup and login flow',
    stories: 10,
    tasks: 10,
    subtasks: 43, 
    bugs: 2,
    overdue: 2
  },
  {
    name: 'Sprint Beta',
    description: 'Dashboard & API Integration',
    stories: 8,
    tasks: 10,
    subtasks: 43, 
    bugs: 2,
    overdue: 2
  },
  {
    name: 'Sprint Gamma',
    description: 'Notifications and Performance',
    tasks: 10,
    subtasks: 43, 
    bugs: 2,
    overdue: 2
  },
  {
    name: 'Sprint Delta',
    description: 'Final Review & Deployment',
    tasks: 10,
    subtasks: 43, 
    bugs: 2,
    overdue: 2
  },
];

// Tab helpers
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

// Component
export default function ProjectDetails() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const completedTasks = 37;
  const totalTasks = 50;
  const percentage = Math.round((completedTasks / totalTasks) * 100);

  const Section = ({ title, bg, children }) => (
    <Box
      sx={{
        backgroundColor: bg,
        color: 'white',
        position: 'relative',
        height: '100%',
        width: '100%',
        px: 1,
        py: 0.5,
        boxSizing: 'border-box',
        border: '1px dotted #ccc',
        overflow: 'hidden',
      }}
    >
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 2, right: 2, color: 'red', p: 0.5 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2" mb={1}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 30px)' }}>{children}</Box>
    </Box>
  );

  const GaugeChart = () => (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
            labelStyle={{
              offset: 5,
              font: { size: '12px', color: '#444' },
            }}
            lineStyle={{ width: 0 }}
          >
            <PointersDirective>
              <PointerDirective
                value={percentage}
                radius="85%"
                color="#4B8DF8"
                pointerWidth={10}
                cap={{ radius: 8, color: "#4B8DF8", border: { color: "#4B8DF8", width: 1 } }}
                needleTail={{ length: "20%", color: "#4B8DF8" }}
                animation={{ enable: true, duration: 1000 }}
              />
            </PointersDirective>

            <RangesDirective>
              <RangeDirective
                start={0}
                end={percentage}
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
        {percentage}% Complete
      </div>
    </div>
  );

  const ProjectDetailsContent = () => {
    const projectInfo = [
      { label: 'Project Name', value: 'NextGen Dashboard' },
      { label: 'Team Members', value: '8' },
      { label: 'Sprints Completed', value: '5' },
      { label: 'Total Sprints', value: '8' },
      { label: 'Stories Completed', value: '42' },
      { label: 'Total Stories', value: '60' },
      { label: 'Project Type', value: 'Agile Scrum' },
      { label: 'Deadline', value: '2025-12-31' },
      { label: 'Client', value: 'TechNova Ltd.' },
      { label: 'Status', value: 'In Progress' },
    ];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 1,
          overflowY: 'auto',
          height: '100%',
        }}
      >
        {projectInfo.map((info, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              p: 1,
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {info.label}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {info.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Summary" {...a11yProps(0)} />

  const InProgressTasks = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', height: '100%' }}>
      {inProgressTasks.map((task, idx) => (
        <Paper
          key={idx}
          elevation={3}
          sx={{ p: 1, backgroundColor: '#fff', color: '#000', borderRadius: 1 }}
        >
          <Typography variant="body2" fontWeight={500}>
            {task.name}
          </Typography>
        </Paper>
      ))}
    </Box>
  );

  const EmployeeStats = () => (
    <Box sx={{ height: '100%', overflowY: 'auto', pr: 1 }}>
      {employees.map((emp, idx) => {
        const total = emp.completed + emp.overdue;
        const performance = Math.round((emp.completed / total) * 100);

        return (
          <Paper key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 1, backgroundColor: '#fff' }}>
            <Avatar>{emp.name[0]}</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {emp.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Joined: {emp.joined}
              </Typography>
              <Typography variant="caption" display="block">
                Completed: {emp.completed}, Overdue: {emp.overdue}
              </Typography>
              <LinearProgress variant="determinate" value={performance} sx={{ height: 6, borderRadius: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Performance: {performance}%
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );

  const TodaysPlan = () => (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', height: '100%', py: 1, px: 1 }}>
      {sprintPlans.map((sprint, idx) => (
        <Paper
          key={idx}
          elevation={4}
          sx={{
            minWidth: 220,
            backgroundColor: '#ffffff',
            color: '#000',
            p: 2,
            borderRadius: 2,
            flexShrink: 0,
            boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="subtitle2" color="primary" fontWeight={600}>
            {sprint.name}
          </Typography>
          <Typography variant="body2" mt={0.5} mb={1}>
            {sprint.description}
          </Typography>
          <Typography variant="caption" display="block">
            📘 Stories: {sprint.stories}
          </Typography>
           <Typography variant="caption" display="block">
            📘 Tasks: {sprint.tasks}
          </Typography>
          <Typography variant="caption" display="block">
            📘 SubTasks: {sprint.subtasks}
          </Typography>
            <Typography variant="caption" display="block">
               🐞 Bugs: {sprint.bugs}
          </Typography>
          <Typography variant="caption" display="block" mb={1}>
            📘 OverDue: {sprint.overdue}
          </Typography>
          <button
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              marginTop: '8px',
            }}
          >
            View Details
          </button>
        </Paper>
      ))}
    </Box>
  );

  
  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            }}
          >
            <Box sx={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}>
              <Section title="Project Details" bg="#d68caa">
                <ProjectDetailsContent />
              </Section>
            </Box>

            <Box sx={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
              <Section title="In Progress Tasks" bg="#72db84">
                <InProgressTasks />
              </Section>
            </Box>

            <Box sx={{ gridColumn: '4 / 5', gridRow: '1 / 2' }}>
              <Section title="Finished" bg="#594d77" />
            </Box>

            <Box sx={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
              <Section title="Status Pie Chart" bg="#cc8c2b">
                <AccumulationChartComponent height="100%" width="100%" tooltip={{ enable: true }} legendSettings={{ visible: true }}>
                  <Inject services={[PieSeries, AccumulationTooltip, AccumulationLegend, AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective dataSource={pieData} xName="x" yName="y" radius="80%" explode explodeOffset="10%" dataLabel={{ visible: true, position: 'Outside', name: 'x' }} />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </Section>
            </Box>

            <Box sx={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
              <Section title="Pie Chart 2" bg="#2bcc38">
                <AccumulationChartComponent height="100%" width="100%" tooltip={{ enable: true }} legendSettings={{ visible: true }}>
                  <Inject services={[PieSeries, AccumulationTooltip, AccumulationLegend, AccumulationDataLabel]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective dataSource={pieData} xName="x" yName="y" radius="80%" explode dataLabel={{ visible: true, position: 'Inside', name: 'x' }} />
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              </Section>
            </Box>

            <Box sx={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
              <GaugeChart />
            </Box>

            <Box sx={{ gridColumn: '4 / 5', gridRow: '2 / 3' }}>
              <Section title="Due" bg="#8378ea" />
            </Box>

            <Box sx={{ gridColumn: '1 / 4', gridRow: '3 / 4' }}>
              <Section title="Today's Plan" bg="#6ab17d">
                <TodaysPlan />
              </Section>
            </Box>

            <Box sx={{ gridColumn: '4 / 5', gridRow: '1 / 4' }}>
              <Section title="Employee Stats" bg="#a04459">
                <EmployeeStats />
              </Section>
            </Box>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Box>
  );

}

}

