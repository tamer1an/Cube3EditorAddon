import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { App } from './App';
import { Navigation } from './Navigation';

export const Main = () => {
 
  return (
    <Router history={history}>
        <Navigation />
        <Route path="/" component={App} />
    </Router>
  );
};
