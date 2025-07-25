import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, dropLineIndex = null, updateTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  // Drop line style
  const dropLine = (
    <Box
      sx={{
        height: '0px',
        borderTop: '3px solid #1E4DB7',
        marginY: '2px',
        borderRadius: '2px',
        zIndex: 10,
      }}
    />
  );

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography variant="h6" align="center" sx={{
        background: '#1E4DB7',
        color: 'white',
        p: 1,
        borderRadius: '4px 4px 0 0',
        mb: 1,
      }}>
        {column.title}
      </Typography>

      <Box
        ref={setNodeRef}
        data-column-id={column.id}
        sx={{
          flex: 1,
          padding: 1,
          backgroundColor: isOver ? '#e3f2fd' : '#f4f4f4',
          borderRadius: '0 0 4px 4px',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {/* Drop line at the top if dropLineIndex === 0 */}
        {dropLineIndex === 0 && dropLine}
        {tasks.map((task, idx) => (
          <React.Fragment key={task.id}>
            <TaskCard task={task} index={idx} columnId={column.id} updateTask={updateTask} />
            {/* Drop line between cards */}
            {dropLineIndex === idx + 1 && dropLine}
          </React.Fragment>
        ))}
        {/* Drop line at the end if dropping into empty column */}
        {tasks.length === 0 && dropLineIndex === 0 && dropLine}
      </Box>
    </Box>
  );
};

export default Column;
