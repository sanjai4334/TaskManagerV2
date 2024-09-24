import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton, Paper, Box, useTheme } from '@mui/material';
import { Close as CloseIcon, Warning as WarningIcon, Today as TodayIcon } from '@mui/icons-material';

const NotificationItem = ({ task, isOverdue }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mb: 2, 
        p: 2, 
        backgroundColor: isDarkMode 
          ? (isOverdue ? 'rgba(255, 152, 0, 0.15)' : 'rgba(33, 150, 243, 0.15)') 
          : (isOverdue ? '#fff4e5' : '#e8f4fd'),
        color: theme.palette.text.primary
      }}
    >
      <Box display="flex" alignItems="center">
        {isOverdue ? (
          <WarningIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
        ) : (
          <TodayIcon sx={{ color: theme.palette.info.main, mr: 1 }} />
        )}
        <ListItemText
          primary={task.title}
          secondary={isOverdue ? `Overdue: ${new Date(task.dueDate).toLocaleDateString()}` : 'Due today'}
          primaryTypographyProps={{ fontWeight: 'bold' }}
          secondaryTypographyProps={{ color: theme.palette.text.secondary }}
        />
      </Box>
    </Paper>
  );
};
const NotificationCenter = ({ open, onClose, tasks }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime() && !task.completed;
  });

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {overdueTasks.map(task => (
            <NotificationItem key={task.id} task={task} isOverdue={true} />
          ))}
          {dueTasks.map(task => (
            <NotificationItem key={task.id} task={task} isOverdue={false} />
          ))}
          {overdueTasks.length === 0 && dueTasks.length === 0 && (
            <Typography variant="body2">No notifications</Typography>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default NotificationCenter;