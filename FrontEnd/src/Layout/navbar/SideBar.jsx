import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

const drawerWidth = 260;
const collapsedWidth = 56;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  top: 'auto'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  top: 'auto'
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Sidebar = ({ open, handleDrawerOpen, handleDrawerClose, menuConfig }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const expanded = {};
    menuConfig.menu.forEach(item => {
      if (item.submenu?.some(sub => location.pathname === `/${menuConfig.path}/${sub.path}`)) {
        expanded[item.label] = true;
      }
    });
    setOpenMenus(expanded);
  }, [location.pathname, menuConfig]);

  const handleClick = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', padding: theme.spacing(1, 1.5) }}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open
            ? theme.direction === 'rtl'
              ? <ChevronRightIcon />
              : <ChevronLeftIcon />
            : <MenuIcon />}
        </IconButton>
      </div>

      <Divider />

      <List>
        {menuConfig.menu.map((item) => {
          const Icon = item.icon;
          const fullPath = `/${menuConfig.path}/${item.path}`;
          const hasSubMenu = !!item.submenu;

          const isSelected = location.pathname === fullPath ||
            (hasSubMenu && item.submenu.some(sub => location.pathname === `/${menuConfig.path}/${sub.path}`));

          return (
            <div key={item.label}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => hasSubMenu && open ? handleClick(item.label) : null}
                  component={!hasSubMenu ? Link : undefined}
                  to={!hasSubMenu ? fullPath : undefined}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  {hasSubMenu && open && (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {hasSubMenu && open && (
                <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((sub) => {
                      const SubIcon = sub.icon;
                      const subPath = `/${menuConfig.path}/${sub.path}`;
                      const isSubSelected = location.pathname === subPath;

                      return (
                        <ListItem key={sub.label} disablePadding sx={{ pl: 4 }}>
                          <ListItemButton
                            component={Link}
                            to={subPath}
                            selected={isSubSelected}
                          >
                            <ListItemIcon>
                              <SubIcon />
                            </ListItemIcon>
                            <ListItemText primary={sub.label} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;