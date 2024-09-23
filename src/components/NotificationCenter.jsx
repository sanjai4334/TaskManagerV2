import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const NotificationCenter = ({ open, onClose, tasks }) => {
  const dueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate <= today && !task.completed;
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {dueTasks.length > 0 ? (
          <List>
            {dueTasks.map(task => (
              <ListItem key={task.id}>
                <ListItemText 
                  primary={task.title} 
                  secondary={`Due: ${new Date(task.dueDate).toLocaleDateString()}`} 
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No tasks due</Typography>
        )}
      </div>
    </Drawer>
  );
};

export default NotificationCenter;
