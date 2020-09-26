import * as React from 'react';
import { useEffect, useState } from 'react';

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

export const App = () => {
  const [init, setInit] = useState([]);

  // useEffect(() => {
  //   // @ts-ignore
  //   if (!globalThis.init) {
  //     let x = processData(setInit)
  //   }
  // });

  return (
    <div>
      {/*<pre>{init.map(((v, key) => <p key={key} style={basicStyles}>{v}</p>))}</pre>*/}
    </div>
  );
};
