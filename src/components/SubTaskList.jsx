import React, { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, TextField, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const SubtaskList = ({ task, setTasks }) => {
  const [newSubtask, setNewSubtask] = useState('');

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id
          ? { ...t, subtasks: [...t.subtasks, { id: Date.now(), title: newSubtask, completed: false }] }
          : t
      )
    );
    setNewSubtask('');
  };

  const toggleSubtaskComplete = (subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              subtasks: t.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : t
      )
    );
  };

  const deleteSubtask = (subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, subtasks: t.subtasks.filter((st) => st.id !== subtaskId) } : t
      )
    );
  };

  return (
    <List>
      {task.subtasks.map((subtask) => (
        <ListItem key={subtask.id}>
          <Checkbox checked={subtask.completed} onChange={() => toggleSubtaskComplete(subtask.id)} />
          <ListItemText primary={subtask.title} />
          <IconButton edge="end" aria-label="delete" onClick={() => deleteSubtask(subtask.id)}>
            <Delete />
          </IconButton>
        </ListItem>
      ))}
      <ListItem>
        <TextField
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="New subtask"
          size="small"
          fullWidth
        />
        <IconButton edge="end" aria-label="add" onClick={addSubtask}>
          <Add />
        </IconButton>
      </ListItem>
    </List>
  );
};

export default SubtaskList;
