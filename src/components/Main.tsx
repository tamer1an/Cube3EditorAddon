import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { App } from './App';
import { Navigation } from './Navigation';

// @ts-ignore
globalThis.init = false;

const processData = async (setInit: any) => {
  const data = await fetch('http://localhost:3000/data.json');
  const layers = await data.json();
  // // @ts-expect-error
  // globalThis.layers = layers;
  const initComplete = layers.findIndex((v: Array<any>) => v[0].includes('^InitComplete'));
  const preInit = layers.slice(0, initComplete+1);
  console.log(preInit);
  // @ts-ignore
  globalThis.init = true;
  setInit(preInit);
};

const basicStyles = {
  textOverflow: 'ellipsis',
  maxWidth: '300px',
  overflow: 'hidden',
}

export const Main = () => {
  const [init, setInit] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (!globalThis.init) {
      let x = processData(setInit)
    }
  });

  return (
    <Router history={history}>
        <Navigation stats={init.map(((v, key) => <p key={key} style={basicStyles}>{v}</p>))}/>
        <Route path="/" component={App} />
    </Router>
  );
};
