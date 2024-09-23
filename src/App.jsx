import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Drawer } from '@mui/material';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import QuickAddTask from './components/QuickAddTask';
import Dashboard from './components/Dashboard';
import { DragDropContext } from 'react-beautiful-dnd';
import NotificationCenter from './components/NotificationCenter';
import { Badge, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [advancedFormOpen, setAdvancedFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);
    setTasks(newTasks);
  };

  const openAdvancedForm = () => {
    setAdvancedFormOpen(true);
  };

  const closeAdvancedForm = () => {
    setAdvancedFormOpen(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setAdvancedFormOpen(true);
  };

  const dueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate <= today && !task.completed;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Header darkMode={darkMode} setDarkMode={setDarkMode}>
          <IconButton color="inherit" onClick={() => setNotificationOpen(true)}>
            <Badge badgeContent={dueTasks.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Header>
        <Container maxWidth="md" className="main-content">
          <Box sx={{ my: 4 }}>
            <Dashboard tasks={tasks} />
            <QuickAddTask setTasks={setTasks} openAdvancedForm={openAdvancedForm} />
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="task-list">
                <TaskList tasks={tasks} setTasks={setTasks} onEditTask={handleEditTask} />
              </div>
            </DragDropContext>
          </Box>
        </Container>
        <Drawer anchor="right" open={advancedFormOpen} onClose={closeAdvancedForm}>
          <Box sx={{ width: 300, p: 2 }}>
            <TaskForm setTasks={setTasks} closeForm={closeAdvancedForm} editingTask={editingTask} />
          </Box>
        </Drawer>
        <NotificationCenter 
          open={notificationOpen} 
          onClose={() => setNotificationOpen(false)} 
          tasks={tasks} 
        />
      </div>
    </ThemeProvider>
  );
};

export default App;