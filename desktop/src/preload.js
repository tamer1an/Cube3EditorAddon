// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
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

switch (location.href) {
  case `${root}desktop/src/index.html`:
    window.addEventListener('DOMContentLoaded', () => {
      version();
      const pathField = document.getElementById('b2b-path')

      document.getElementById('angular').addEventListener('click', () => {
        localStorage.setItem('filePath', pathField.value)
        window.open('../../dist/editor/index.html',
          "AngularPluggin",
          "resizable=yes,scrollbars=yes,width=800,height=600,left=100,top=40");
      });

      document.getElementById('react').addEventListener('click', () => {
        localStorage.setItem('filePath', pathField.value)
        window.open('../../build/index.html',
          "ReactPluggin",
          "resizable=yes,scrollbars=yes,width=600,height=300,left=150,top=20");
      });
    });
}


