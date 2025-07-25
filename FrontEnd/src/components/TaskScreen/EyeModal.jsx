import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Divider, Typography, IconButton, Box, Button, TextField, Stack, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function JiraModal({ open, onClose, task, updateTask }) {
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
  // Use task fields if provided, else fallback
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingAssignee, setEditingAssignee] = useState(false);
  const [editingReporter, setEditingReporter] = useState(false);
  const [localTask, setLocalTask] = useState(task);
  const [tempTitle, setTempTitle] = useState(task?.title || '');
  const [tempDescription, setTempDescription] = useState(task?.description || '');
  const [tempAssignee, setTempAssignee] = useState(task?.assignee || '');
  const [tempReporter, setTempReporter] = useState(task?.creator || '');

  useEffect(() => {
    setLocalTask(task);
    setTempTitle(task?.title || '');
    setTempDescription(task?.description || '');
    setTempAssignee(task?.assignee || '');
    setTempReporter(task?.creator || '');
    setEditingTitle(false);
    setEditingDescription(false);
    setEditingAssignee(false);
    setEditingReporter(false);
  }, [task]);

  const handleSaveTitle = () => {
    setEditingTitle(false);
    setLocalTask(prev => ({ ...task, ...prev, title: tempTitle }));
    if (task && tempTitle !== task.title && typeof updateTask === 'function') {
      updateTask(task.id, { title: tempTitle });
    }
  };
  const handleCancelTitle = () => {
    setTempTitle(localTask?.title || '');
    setEditingTitle(false);
  };
  const handleTitleChange = e => {
    if (e.target.value.length <= 50) setTempTitle(e.target.value);
  };

  const handleSaveDescription = () => {
    setEditingDescription(false);
    setLocalTask(prev => ({ ...task, ...prev, description: tempDescription }));
    if (task && tempDescription !== task.description && typeof updateTask === 'function') {
      updateTask(task.id, { description: tempDescription });
    }
  };
  const handleCancelDescription = () => {
    setTempDescription(localTask?.description || '');
    setEditingDescription(false);
  };
  const handleDescriptionChange = e => {
    if (e.target.value.length <= 500) setTempDescription(e.target.value);
  };

  // Track which tab is active: 'comments' or 'subtasks'
  const [activeTab, setActiveTab] = useState('comments');
  const [comment, setComment] = useState('');
  const [editingComment, setEditingComment] = useState(false);
  const [tempComment, setTempComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const statuses = ['To Do', 'In Progress', 'Testing', 'Deployment'];
  const priorities = ['red', 'yellow', 'green'];

  const detailFields = [
    { name: 'Assignee', value: 'null' },
    { name: 'Sprint', value: 'null' },
    { name: 'Reporter', value: 'null' },
    { name: 'Status', value: 'To Do' },
    { name: 'Type', value: 'null' },
    { name: 'Priority', value: 'red' },
    { name: 'Created Date', value: 'null' },
    { name: 'Updated Date', value: 'null' }
  ];

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

  const handleCommentChange = e => {
    if (e.target.value.length <= 500) setTempComment(e.target.value);
  };
  const handleSaveComment = () => {
    setComment(tempComment);
    setEditingComment(false);
  };
  const handleCancelComment = () => {
    setTempComment(comment);
    setEditingComment(false);
  };

  const handleSaveAssignee = () => {
    setEditingAssignee(false);
    setLocalTask(prev => ({ ...task, ...prev, assignee: tempAssignee }));
    if (task && tempAssignee !== task.assignee && typeof updateTask === 'function') {
      updateTask(task.id, { assignee: tempAssignee });
    }
  };
  const handleCancelAssignee = () => {
    setTempAssignee(localTask?.assignee || '');
    setEditingAssignee(false);
  };
  const handleAssigneeChange = e => {
    setTempAssignee(e.target.value);
  };

  const handleSaveReporter = () => {
    setEditingReporter(false);
    setLocalTask(prev => ({ ...task, ...prev, creator: tempReporter }));
    if (task && tempReporter !== task.creator && typeof updateTask === 'function') {
      updateTask(task.id, { creator: tempReporter });
    }
  };
  const handleCancelReporter = () => {
    setTempReporter(localTask?.creator || '');
    setEditingReporter(false);
  };
  const handleReporterChange = e => {
    setTempReporter(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} fullWidth PaperProps={{ sx: { height: '70vh', width: '75vw', maxWidth: '75vw' , minWidth:'70vw'} }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <DialogTitle sx={{ textAlign: 'left', padding: 0, pl: 2, pr: 2, pt: 2, pb: 0, m: 0 }}>
          {!editingTitle ? (
            <Box onClick={() => setEditingTitle(true)} sx={{ cursor: 'pointer', minHeight: 32 }}>
              <Typography variant="h6" sx={{ wordBreak: 'break-word', pl: 0 }}>{localTask?.title || 'Untitled Task'}</Typography>
            </Box>
          ) : (
            <Box>
              <TextField
                value={tempTitle}
                onChange={handleTitleChange}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ maxLength: 50 }}
                helperText={`${tempTitle.length}/50 characters`}
                sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.6 } }}
              />
              <Stack direction="row" spacing={1}>
                <Button variant="contained" size="small" onClick={handleSaveTitle}>Save</Button>
                <Button variant="text" size="small" onClick={handleCancelTitle}>Cancel</Button>
              </Stack>
            </Box>
          )}
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
            {!editingDescription ? (
              <Box onClick={() => setEditingDescription(true)} sx={{ cursor: 'pointer', mt: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{localTask?.description}</Typography>
              </Box>
            ) : (
              <Box>
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  value={tempDescription}
                  onChange={handleDescriptionChange}
                  variant="outlined"
                  margin="dense"
                  inputProps={{ maxLength: 500 }}
                  helperText={`${tempDescription.length}/500 characters`}
                  sx={{ '& .MuiInputBase-input': { fontSize: '0.875rem' } }}
                />
                <Stack direction="row" spacing={1} mt={1}>
                  <Button variant="contained" size="small" onClick={handleSaveDescription}>Save</Button>
                  <Button variant="text" size="small" onClick={handleCancelDescription}>Cancel</Button>
                </Stack>
              </Box>
            )}
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
            {activeTab === 'subtasks' && Array.isArray(localTask?.subtasks) && localTask.subtasks.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Sub-Tasks</Typography>
                <Stack spacing={1}>
                  {localTask.subtasks
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
                {localTask.subtasks.length > 3 && (
                  <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                    <Button size="small" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</Button>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>Page {currentPage} of {Math.ceil(localTask.subtasks.length / 3)}</Typography>
                    <Button size="small" disabled={currentPage === Math.ceil(localTask.subtasks.length / 3)} onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(localTask.subtasks.length / 3)))}>Next</Button>
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
              {!editingAssignee ? (
                <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px', cursor: 'pointer' }} onClick={() => setEditingAssignee(true)}>
                  {get(localTask?.assignee)}
                </Typography>
              ) : (
                <Box sx={{ marginLeft: '80px', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField size="small" value={tempAssignee} onChange={handleAssigneeChange} variant="outlined" sx={{ minWidth: 100 }} />
                  <Button size="small" variant="contained" onClick={handleSaveAssignee}>Save</Button>
                  <Button size="small" variant="text" onClick={handleCancelAssignee}>Cancel</Button>
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Sprint</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px' }}>{get(task?.sprint)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" mb={2} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: '120px' }}>Reporter</Typography>
              {!editingReporter ? (
                <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '80px', cursor: 'pointer' }} onClick={() => setEditingReporter(true)}>
                  {get(localTask?.creator)}
                </Typography>
              ) : (
                <Box sx={{ marginLeft: '80px', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField size="small" value={tempReporter} onChange={handleReporterChange} variant="outlined" sx={{ minWidth: 100 }} />
                  <Button size="small" variant="contained" onClick={handleSaveReporter}>Save</Button>
                  <Button size="small" variant="text" onClick={handleCancelReporter}>Cancel</Button>
                </Box>
              )}
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