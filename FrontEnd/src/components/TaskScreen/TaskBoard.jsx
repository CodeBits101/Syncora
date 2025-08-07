import React from 'react';
import { Box, Typography } from '@mui/material';
import Board from './Board';
import { IoChevronBackCircleOutline } from "react-icons/io5";

const TaskBoard = () => {
  return (
    <Box className = "pb-3" display="flex" height="100vh" width="100vw" overflow="hidden">
      <Box width="0px" flexShrink={0} /> {/* Sidebar space */}

      <Box flex={1} overflow="hidden" display="flex" flexDirection="column">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Box display="flex" sx={{ alignItems: 'center', gap: 1 }}>
            <IoChevronBackCircleOutline size={30} style={{ cursor: 'pointer' }} onClick={() => window.history.back()} />
            <Typography variant="h5">Project Name</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Welcome, John</Typography>
            <Typography variant="body2" color="text.secondary">
              Tue, 07 June 2022
            </Typography>
          </Box>
        </Box>

        {/* RIBBON */}
        <Box
          height="50px"
          sx={{
            background: 'linear-gradient(to right, #1E4DB7, #5B86E5, #ffffff)',
            mb: 2,
            borderRadius: '4px',
            mx: 2,
          }}
        />

        {/* BOARD WRAPPER */}
        <Box flex={1} overflow="hidden" px={2}>
          <Board />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskBoard;
