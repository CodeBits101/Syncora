import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import  logo  from '../../assets/logo_light.png';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={0} >
      <Toolbar style={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 50, width: 160, objectFit: 'cover' }}
            />
          </Box>
          <Typography variant="h6" noWrap style={{ padding:15}} >
            Hi User
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;