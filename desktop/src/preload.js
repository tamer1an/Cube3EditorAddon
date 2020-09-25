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

switch (location.href) {
  case `${root}desktop/src/index.html`:
    window.addEventListener('DOMContentLoaded', () => {
      version();
      const pathField = document.getElementById('b2b-path');

      document.getElementById('angular').addEventListener('click', () => {
        setStore(pathField.value);
        window.open('../../dist/editor/index.html',
          "AngularPluggin",
          "resizable=yes,scrollbars=yes,width=800,height=600,left=100,top=40");
      });

      document.getElementById('react').addEventListener('click', () => {
        setStore(pathField.value);
        window.open('../../build/index.html',
          "ReactPluggin",
          "resizable=yes,scrollbars=yes,width=600,height=300,left=150,top=20");
      });
    });
  default:
    globalThis.fileContent = new TextDecoder("utf-8").decode(ipcRenderer.sendSync('synchronous-message', 'ping'))
    // fileContent.split('^')
}


