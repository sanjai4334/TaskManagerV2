import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Assignment, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  const DashboardItem = ({ title, value, icon }) => (
    <Grid item xs={4}>
      <Paper elevation={2} sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {icon}
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Paper>
    </Grid>
  );

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <DashboardItem title="Total" value={totalTasks} icon={<Assignment color="primary" />} />
        <DashboardItem title="Done" value={completedTasks} icon={<CheckCircle color="success" />} />
        <DashboardItem title="Todo" value={incompleteTasks} icon={<RadioButtonUnchecked color="error" />} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
