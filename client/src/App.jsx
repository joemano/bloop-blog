import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
        <Routes>
          <Route exact path='/' element={<Navigate to='/posts' />} />
          <Route exact path='/posts' element={<Home />} />
          <Route exact path='/posts/search' element={<Home />} />
          <Route exact path='/posts/:id' element={<PostDetails />} />
          <Route
            exact
            path='/auth'
            element={!user ? <Auth /> : <Navigate to='/posts' />}
          />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
