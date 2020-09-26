// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require('electron');
const root = 'file:///C:/Users/tavr2/WebstormProjects/Cube3EditorAddon/';
const version = () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
}

const setStore = (path, itemName = 'filePath') => {
  localStorage.setItem(itemName, path.replace('C:\\fakepath\\', root + 'public/cube'))
}

const openPage = (id, target, path, features) => {
  document.getElementById(id)
    .addEventListener('click', () => {
      setStore(document.getElementById('b2b-path').value);
      window.open('../../build/index.html',
        target,
        features,
      );
    });
}

switch (location.href) {
  case `${root}desktop/src/index.html`:
    window.addEventListener('DOMContentLoaded', () => {
      version();
      const pathField = document.getElementById('b2b-path');
      openPage(
        'angular',
      'AngularPluggin',
      '../../dist/editor/index.html',
      'resizable=yes,scrollbars=yes,width=800,height=600,left=100,top=40',
      );
      openPage(
        'react',
        'ReactPluggin',
        '../../build/index.html',
        'resizable=yes,scrollbars=yes,width=800,height=600,left=100,top=40',
      );
    });

  default:
    globalThis.fileContent = new TextDecoder("utf-8")
      .decode(ipcRenderer.sendSync('synchronous-message', 'ping'))

    const input = globalThis
      .fileContent
      .trim()
      .split('^')
      .map(v => '^' + v);

    const layered = input.map(v => {
      const char = '\n';
      const data = { layers: [] } ;
      let i = 0;
      let j = 0;

      while ((j = v.indexOf(char, i)) !== -1) {
        data.layers.push(v.substring(i, j))
        i = j + 1;
      }
      return data;
    });

    globalThis.parsedData = layered;

    const layers = layered
      .map(v => v.layers)
      .filter(v => typeof v[0] === 'string');

    globalThis.layers = layers;

    // const initComplete = layers.map(v => v.layers)
    //   .filter(v => typeof v[0] === 'string')
    //   .filter((v, k) => {
    //     const item = v[0].includes('^InitComplete');
    //     return item;
    //   })
    console.log(layered);
}


