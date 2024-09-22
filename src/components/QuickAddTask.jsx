import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const QuickAddTask = ({ setTasks, openAdvancedForm }) => {
  const [quickTask, setQuickTask] = useState('');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTask.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: quickTask,
      description: '',
      category: '',
      priority: 'medium',
      dueDate: null,
      completed: false,
      subtasks: [],
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setQuickTask('');
  };

  return (
    <Box component="form" onSubmit={handleQuickAdd} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Add a task"
        value={quickTask}
        onChange={(e) => setQuickTask(e.target.value)}
      />
      <IconButton type="submit" color="primary" sx={{ ml: 1 }}>
        <AddIcon />
      </IconButton>
      <IconButton color="secondary" onClick={openAdvancedForm} sx={{ ml: 1 }}>
        More
      </IconButton>
    </Box>
  );
};

export default QuickAddTask;
