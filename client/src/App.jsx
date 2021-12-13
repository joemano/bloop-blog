import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, } from '@material-ui/core';

//Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <BrowserRouter basename='/bloop'>
      <CssBaseline />
      <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/posts' />} />
          <Route exact path='/posts' component={Home} />
          <Route exact path='/posts/search' component={Home} />
          <Route exact path='/posts/:id' component={PostDetails} />
          <Route
            exact
            path='/auth'
            component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
          />
        </Switch>
    </BrowserRouter>
  );
};

export default App;
