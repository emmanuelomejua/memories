import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './style';
import memories from '../../images/memories.png';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';



const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const history = useHistory()

    const logout = () => {
        dispatch({type: 'LOGOUT'})

        history.push('/auth')
        setUser(null)
    }


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>

        <Toolbar className={classes.toolbar}>
            {user ? 
                <div className={classes.profile}>
                    <Avatar className={classes.purple} 
                       alt={user && user.result ? user.result.name : ''}
                       src={user && user.result ? user.result.imageUrl : ''}
                    >
                    {user && user.data && user.data.name ? user.data.name.charAt(0) : ''}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6'>{user && user.data && user.data.name}</Typography>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </div>
            : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
