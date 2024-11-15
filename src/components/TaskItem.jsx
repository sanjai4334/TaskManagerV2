import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Chip, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TaskItem = ({ task, index, setTasks, onEditTask }) => {
  const toggleComplete = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={() => onEditTask(task)}>
            <Edit />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
            <Delete />
          </IconButton>
        </>
      }
    >
      <Checkbox checked={task.completed} onChange={toggleComplete} />
      <ListItemText
        primary={task.title}
        secondary={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {task.category && <Chip label={task.category} size="small" />}
            {task.priority && <Chip label={task.priority} size="small" color="primary" />}
            {task.dueDate && (
              <Chip
                label={new Date(task.dueDate).toLocaleDateString()}
                size="small"
                color="secondary"
              />
            )}
          </Box>
        }
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  );
};

export default TaskItem;
