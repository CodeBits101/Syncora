import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Divider, Typography, IconButton, Box, Button, Stack, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function JiraModal({ open, onClose, task, updateTask, sprintId, projectId }) {
  // Fallbacks for missing fields
  const get = (v, fallback = '-') => (v ? v : fallback);
  const getPriorityColor = priority => {
    if (priority === 'red') return '#ff0000';
    if (priority === 'yellow') return '#ffff00';
    if (priority === 'green') return '#00cc66';
    return 'text.secondary';
  };
  const formatDate = date => {
    if (!date) return '-';
    const d = new Date(date);
    if (isNaN(d)) return date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Track which tab is active: 'comments' or 'subtasks'
  const [activeTab, setActiveTab] = useState('comments');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const statuses = ['To Do', 'In Progress', 'Testing', 'Deployment'];
  const priorities = ['red', 'yellow', 'green'];

  // obsolete array 
  // const detailFields = [
  //   { name: 'Assignee', value: 'null' },
  //   { name: 'Sprint', value: 'null' },
  //   { name: 'Reporter', value: 'null' },
  //   { name: 'Status', value: 'To Do' },
  //   { name: 'Type', value: 'null' },
  //   { name: 'Priority', value: 'red' },
  //   { name: 'Created Date', value: 'null' },
  //   { name: 'Updated Date', value: 'null' }
  // ];

  const dummySubtasks = [
    'Update modal layout for better readability',
    'Fix vertical scrolling issue in left panel',
    'Add meaningful titles to dummy subtasks list',
    'Implement character limit validation for comments',
    'Refactor code to improve maintainability',
    'Align details section with better spacing',
    'Enable toggling between comments and subtasks view',
    'Ensure long text wraps correctly without overflow',
    'Test modal responsiveness on various screen sizes',
    'Review and finalize UI design improvements'
  ].map(title => ({
    title,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)]
  }));

  const totalPages = Math.ceil(dummySubtasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubtasks = dummySubtasks.slice(startIndex, startIndex + itemsPerPage);

  const scrollRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const bottomReached = scrollTop + clientHeight >= scrollHeight - 5;
    setAtBottom(bottomReached);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} fullWidth PaperProps={{ sx: { height: '70vh', width: '75vw', maxWidth: '75vw' , minWidth:'70vw'} }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <DialogTitle sx={{ textAlign: 'left', padding: 0, pl: 2, pr: 2, pt: 2, pb: 0, m: 0 }}>
          <Box sx={{ minHeight: 32 }}>
            <Typography variant="h6" sx={{ wordBreak: 'break-word', pl: 0 }}>{task?.title || 'Untitled Task'}</Typography>
          </Box>
        </DialogTitle>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <Divider />
      <DialogContent style={{ display: 'flex', gap: '24px', height: '65vh', overflow: 'hidden' }}>
        {/* Left Section */}
        <Box
          flex={2.2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
            maxHeight: '100%',
            minWidth: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            pr: 1,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            transition: 'mask-image 0.3s ease',
          }}
        >
          <Box sx={{ pl: 2, pr: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', pl: 0 }}>Description</Typography>
            <Box sx={{ mt: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{task?.description}</Typography>
            </Box>
            <Stack direction="row" spacing={2} mt={3} mb={2}>
              <Button
                variant={activeTab === 'comments' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setActiveTab('comments')}
              >
                Comments
              </Button>
              <Button
                variant={activeTab === 'subtasks' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setActiveTab('subtasks')}
              >
                Sub-Tasks
              </Button>
            </Stack>
            {activeTab === 'subtasks' && Array.isArray(task?.subtasks) && task.subtasks.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Sub-Tasks</Typography>
                <Stack spacing={1}>
                  {task.subtasks
                    .slice((currentPage - 1) * 3, currentPage * 3)
                    .map((st, idx) => (
                      <Box key={st.id || idx} display="flex" alignItems="center" gap={2} p={1} borderRadius={1} bgcolor="#f7f7f7">
                        <Typography variant="body2" sx={{ flex: 1 }}>{st.title}</Typography>
                        {st.status && (
                          <Typography variant="caption" color="text.secondary">{st.status}</Typography>
                        )}
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: getPriorityColor(st.priority), mr: 1 }} />
                      </Box>
                    ))}
                </Stack>
                {task.subtasks.length > 3 && (
                  <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                    <Button size="small" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</Button>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>Page {currentPage} of {Math.ceil(task.subtasks.length / 3)}</Typography>
                    <Button size="small" disabled={currentPage === Math.ceil(task.subtasks.length / 3)} onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(task.subtasks.length / 3)))}>Next</Button>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        </Box>
        {/* Right Section */}
        <Box flex={1.2} borderLeft="1px solid #ddd" pl={2} sx={{ maxHeight: '100%', minWidth: 0, overflowY: 'auto', overflowX: 'hidden' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>Details</Typography>
          <Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Assignee</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>
                {get(task?.assignee)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Sprint</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{get(task?.sprint)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Reporter</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>
                {get(task?.creator)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Status</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{task?.status || '-'}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Type</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{get(task?.type)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Priority</Typography>
              <Box sx={{ marginLeft: '80px', width: 8, height: 8, borderRadius: '50%', bgcolor: getPriorityColor(get(task?.priority, 'red')), display: 'inline-block', mr: 1 }} />
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Created Date</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{formatDate(task?.createdAt)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Updated Date</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{formatDate(task?.updatedAt)}</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}