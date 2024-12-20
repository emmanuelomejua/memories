import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login'
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import Icon from './Icon';
import Input from './Input';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = {firstName: '', lastNAme: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {

  const classes = useStyles();

  const [isSignUp, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const [userDetails, setUsertDetails] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory()

  const switchMode = () => {
    setIsSignup(!isSignUp)
    setShowPassword(false);
  }


  const handleShowPassword = () =>  {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp){
      dispatch(signup(userDetails, history))
    } else {
      dispatch(signin(userDetails, history))
    }
  }

  const handleChange = (e) => {
    setUsertDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const googleSuccess = async (res) => {
    const result = res.profileObj;
    const token = res.tokenId;

    try {
      dispatch({type: 'AUTH', data: {result, token}})
      history.push('/');
    } catch (error) {
      console.error(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error);
  }

  return (
    <Container component='main' maxWidth='xs' >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>

        <Typography variant='h5'>{isSignUp ? 'Sign Up': 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          { isSignUp && (
            <React.Fragment>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
               <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </React.Fragment>
            )}

            <Input name='email' label='Email' handleChange={handleChange} type='email'/>
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword === true ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>

            { isSignUp &&
                <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>
            }
          </Grid>
          <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>{isSignUp ? 'Sign Up': 'Sign In'}</Button>

            <GoogleLogin
              clientId=''
              render={(renderProps)=> (
                <Button 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                // disabled={renderProps.disabled} 
                startIcon={<Icon/>} 
                variant='contained'>
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single-host_origin'
            /> 

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account? Sign In': 'Do not have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
