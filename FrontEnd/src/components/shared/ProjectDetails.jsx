// import * as React from 'react';
// import {
//   Box,
//   Grid,
//   IconButton,
//   Typography,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import PropTypes from 'prop-types';
// import CloseIcon from '@mui/icons-material/Close';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie, Doughnut } from 'react-chartjs-2';
// import GaugeChart from 'react-gauge-chart';


// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//       style={{ height: '100%', overflow: 'hidden' }}
//     >
//       {value === index && <Box sx={{ p: 0, height: '100%' }}>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function ProjectDetails() {
//   const [value, setValue] = React.useState(0);
//   const handleChange = (event, newValue) => setValue(newValue);
//   ChartJS.register(ArcElement, Tooltip, Legend);
//   const data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins:
//     {
//       legend: {
//         position: 'right'
//       }
//     },
//   }




//   const Section = ({ title, bg }) => (
//     <Box
//       sx={{
//         backgroundColor: bg,
//         color: 'white',
//         position: 'relative',
//         height: '100%',
//         width: '100%',
//         px: 1,
//         py: 0.5,
//         boxSizing: 'border-box',
//         border: '1px dotted #ccc',
//       }}
//     >
//       <IconButton
//         size="small"
//         sx={{ position: 'absolute', top: 2, right: 2, color: 'red', p: 0.5 }}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//       <Typography variant="body2">{title}</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="tabs">
//           <Tab label="Summary" {...a11yProps(0)} />
//         </Tabs>
//       </Box>

//       <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
//         <CustomTabPanel value={value} index={0}>
//           <Grid
//             container
//             spacing={0.5}
//             sx={{
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr 1fr 1fr',
//               gridTemplateRows: '30% 35% 35%',
//               height: '100%',
//             }}
//           >
//             {/* Row 1 */}
//             <Box sx={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}>
//               <Section title="projectdetails" bg="#d68caa" />
//             </Box>
//             <Box sx={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
//               <Section title="planned" bg="#72db84" />
//             </Box>
//             <Box sx={{ gridColumn: '4 / 5', gridRow: '1 / 2' }}>
//               <Section title="finished" bg="#594d77" />
//             </Box>
//             <Box sx={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
//               <Doughnut data={data} options={options} />
//             </Box>
//             <Box sx={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
//               <Pie data={data} options={options} />
//             </Box>
//             <Box sx={{ gridColumn: '3 / 4', gridRow: '2 / 3', width: '100%' }}>
//               <GaugeChart
//                 id="gauge-chart"
//                 nrOfLevels={20}
//                 percent={0.6}
//                 colors={["#00FF00", "#FF0000"]}
//                 arcWidth={0.3}
//               />
//             </Box>
//             <Box sx={{ gridColumn: '4 / 5', gridRow: '2 / 3' }}>
//               <Section title="due" bg="#8378ea" />
//             </Box>

//             {/* Row 3 */}
//             <Box sx={{ gridColumn: '1 / 4', gridRow: '3 / 4' }}>
//               <Section title="todaysplan" bg="#6ab17d" />
//             </Box>
//             <Box sx={{ gridColumn: '4 / 5', gridRow: '1 / 4' }}>
//               <Section title="employeestats" bg="#a04459" />
//             </Box>
//           </Grid>
//         </CustomTabPanel>
//       </Box>
//     </Box>
//   );
// }
