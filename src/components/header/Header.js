import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './headerStyles';
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Box,
  Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import MenuUser from '../menuUser/MenuUser';
import { FirstListMenu, SecondListMenu } from './listMenu/ListMenu';

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/home" className={classes.headerText}>
            <Typography variant="h6" noWrap>
              TextMe
            </Typography>
          </NavLink>
          <Box className={clsx(classes.iconHeader)}>
            <MenuUser />
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={classes.drawerOpen}
          classes={{
            paper: classes.drawerOpen,
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <FirstListMenu />
          <Divider />
          <SecondListMenu />
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <FirstListMenu onClick={handleDrawerToggle} />
          <Divider />
          <SecondListMenu onClick={handleDrawerToggle}/>
        </Drawer>
      </Hidden>

      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
