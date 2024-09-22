import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from '@mui/material';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
          }
          label="Dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
