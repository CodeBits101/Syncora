import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../navbar/SideBar';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';

const drawerOffset = 64;

const Home = ({ roleConfig }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />

      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, backgroundColor: 'background.default' }}>
        <Header />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar
          open={open}
          handleDrawerOpen={() => setOpen(true)}
          handleDrawerClose={() => setOpen(false)}
          headerHeight={drawerOffset}
          menuConfig={roleConfig}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;