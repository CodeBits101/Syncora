import React from 'react';
import {
  Box,
  Card,
  Divider,
  IconButton,
  Badge,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  createTheme,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FolderZip, InfoOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#c0bfbfff',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#929292ff',
          },
          '&:hover': {
            backgroundColor: '#f1eaeaff',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
        },
        body: {
          fontSize: '0.95rem',
        },
      },
    },
  },
});


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 30,
    top: 25,
    fontSize: 30,
    height: 40,
    minWidth: 40,
    borderRadius: '50%',
    background: 'crimson',
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const projectData = [
  { id: 1, title: "Under Planning", summary: "Project is about to On Board for development", badgeCount: 4, iconColor: "warning", path: "planning" },
  { id: 2, title: "In Progress", summary: "Projects are under Development phase", badgeCount: 4, iconColor: "primary", path: "inprogress" },
  { id: 3, title: "Completed", summary: "Projects are completed successfully.", badgeCount: 0, iconColor: "success", path: "completed" },
  { id: 4, title: "On Hold", summary: "Projects are put currently paused.", badgeCount: 2, iconColor: "error", path: "onhold" },
  { id: 5, title: "Upcoming", summary: "Scheduled to begin next month.", badgeCount: 1, iconColor: "secondary", path: "upcoming" },
];

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function Projects() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          justifyContent: 'space-between',
          gap: 2,
          p: 2,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: 4,
          },
        }}
      >
        {projectData.map((project) => (
          <Card key={project.id} sx={{ minWidth: 300, flexShrink: 0 }}>
            <CardActionArea>
              <CardMedia
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <StyledBadge badgeContent={project.badgeCount} color="default" showZero>
                  <FolderZip color={project.iconColor} sx={{ fontSize: 140 }} />
                </StyledBadge>
              </CardMedia>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {project.summary}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <Tooltip title={`Click to View List of ${project.title} projects`} placement='bottom-end'>
                <IconButton component={Link} to={project.path} size="small" color="primary">
                  <InfoOutlined />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Divider sx={{ mt: 2, mb: 1 }}>
        <Typography sx={{ fontSize: 'xx-large' }}>In Progress Projects</Typography>
      </Divider>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 345 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ background: '#e7e7e7ff' }}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default Projects;
