import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { App } from './App';
import { Navigation } from './Navigation';

// TODO: init state
// @ts-ignore
globalThis.init = false;

const processData = async (setInit: any) => {
  // TODO: hardcoded link
  const data = await fetch('http://localhost:3000/data.json');
  const layered = await data.json();
  const initComplete = layered.findIndex((v: Array<any>) => v[0].includes('^InitComplete'));
  const preInit = layered.splice(0, initComplete + 1);
  const layerTime = layered.map((v: Array<any>) => v[0].split(' '));
  console.log(layerTime);

  // @ts-ignore
  globalThis.init = true;
  setInit({ preInit, layerTime });
};

export const Main = () => {
  const [init, setInit] = useState({ preInit: [] });

  useEffect(() => {
    // @ts-ignore
    if (!globalThis.init) {
      let result = processData(setInit);
    }
  });

  return (
    <Router history={history}>
        <Navigation stats={init}/>
        <Route path="/" component={App} />
    </Router>
  );
};
