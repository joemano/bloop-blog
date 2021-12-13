import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signup, signin } from '../../actions/auth';
import signinImage from '../../images/gurasignin.png';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);

  // This is a state that checks if a user is signing in or signing up.
  // This way you don't have to create a separate route for each.
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <Paper component='main' className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <>
                  <Input
                    name='confirmPassword'
                    label='Confirm Password'
                    handleChange={handleChange}
                    type='password'
                  />
                </>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
              clientId='1005263508660-8kfe44b6tba8v6nfho8nulg86freq0cn.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item className={classes.image} xs={false} sm={6} md={8} style={{ backgroundImage: `url(${signinImage})`}} />
    </Grid>
  );
};

export default Auth;
