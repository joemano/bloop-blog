import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';

import bloop from '../../images/bloop.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

const Navbar = ({ user, setUser }) => {
 
  const classes = useStyles();

  const dispatch = useDispatch();

  // router hooks
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    // Logout the user if the token has expired
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // location is the dependency so that the user profile is refreshed on redirect
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');
    setUser(null);
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Bloop!</Typography>
        <img className={classes.image} src={bloop} alt="bloop" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;