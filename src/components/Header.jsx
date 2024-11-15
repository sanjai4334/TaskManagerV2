import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { 
  Brightness7 as SunIcon, 
  Brightness4 as MoonIcon,
  Logout as LogoutIcon 
} from '@mui/icons-material';

const Header = ({ darkMode, setDarkMode, children, onLogout, user }) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {children}
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
        {user && (
          <IconButton color="inherit" onClick={onLogout} sx={{ ml: 1 }}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;