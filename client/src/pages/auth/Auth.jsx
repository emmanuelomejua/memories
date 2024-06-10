import React from 'react';
import { LockOutlinedIcon } from '@material-ui/icons';
import useStyles from './style';
import { Avatar, Container, Paper, Typography } from '@material-ui/core';

const Auth = () => {

  const classes = useStyles();

  const isSignUp = false;

  return (
    <Container component='main' maxWidth='xs' >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>

        <Typography variant='h5'>{isSignUp ? 'Sign Up': 'Sign In'}</Typography>
      </Paper>
    </Container>
  )
}

export default Auth
