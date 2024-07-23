import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export const Employee = () => {
  return (
    <div>
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography variant="h6" component="div">
            Employee Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" color="textPrimary">
          No seat allocated to you
        </Typography>
      </Container>
    </div>
  );
};
