import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Container } from '@material-ui/core';


import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/auth' exact component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
