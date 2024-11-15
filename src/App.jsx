import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Drawer } from '@mui/material';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import QuickAddTask from './components/QuickAddTask';
import Dashboard from './components/Dashboard';
import NotificationCenter from './components/NotificationCenter';
import { Badge, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [advancedFormOpen, setAdvancedFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTasks([]);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const dueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate <= today && !task.completed;
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={
            !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
          } />
          <Route path="/register" element={
            !user ? <Register onRegister={handleRegister} /> : <Navigate to="/" />
          } />
          <Route path="/" element={
            user ? (
              <div className="app-container">
                <Header 
                  darkMode={darkMode} 
                  setDarkMode={setDarkMode}
                  onLogout={handleLogout}
                  user={user}
                >
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
                    <div className="task-list">
                      <TaskList tasks={tasks} setTasks={setTasks} onEditTask={handleEditTask} />
                    </div>
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
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};export default App;