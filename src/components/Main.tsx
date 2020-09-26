import React, { useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../history';
import { App } from './App';
import { Navigation } from './Navigation';

// TODO: init state
// @ts-ignore
// globalThis.init = false;
const processData = async (setInit: any) => {
  // TODO: hardcoded link
  const data = await fetch('http://localhost:3000/data.json');
  const layered = await data.json();
  const initComplete = layered.findIndex((v: Array<any>) => v[0].includes('^InitComplete'));
  const preInit = layered.splice(0, initComplete + 1);
  const layerTime = layered.map((v: Array<any>) => v[0].split(' '));

  // @ts-ignore
  globalThis.init = true;
  setInit({ preInit, layerTime });
};

export const Main = () => {
  const [init, setInit] = useState({ preInit: [] });
  const onInput = (v: any) => {
    const file = v.target?.files.item(0);
    const reader = new FileReader();
    reader.onload = function (v) {
      if (!Object.is(v?.target?.result, null) && typeof v?.target?.result === 'string') {
        const input = v.target.result
          .trim()
          .split('^')
          .map((v) => '^' + v);

        const layered = input.map(v => {
          const char = '\n';
          const data = { layers: [] } ;
          let i = 0;
          let j = 0;

          while ((j = v.indexOf(char, i)) !== -1) {
            // @ts-expect-error
            data.layers.push(v.substring(i, j))
            i = j + 1;
          }
          return data;
        });

        const layers = layered
          .map(v => v.layers)
          .filter(v => typeof v[0] === 'string') || [];

        const initComplete = layers.findIndex((v: Array<any>) => v[0].includes('^InitComplete'));
        const preInit = layers.splice(0, initComplete + 1);
        const layerTime = layers.map((v: Array<any>) => v[0].split(' '));

        console.log(layerTime);
        // @ts-ignore
        setInit({ preInit, layerTime });
      }
    };

    reader.readAsText(file);
  };

  // useEffect(() => {
  //   // @ts-ignore
  //   if (!globalThis.init) {
  //     let result = processData(setInit);
  //   }
  // });

  return (
    <Router history={history}>
      <input type="file" onInput={onInput} />
      <Navigation stats={init} />
      {/*<Route path="/" component={App} />*/}
      <App stats={init} />
    </Router>
  );
};
