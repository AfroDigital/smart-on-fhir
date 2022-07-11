import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/App'

console.info('content/index')

const divHTMLElement = document.createElement('div')
divHTMLElement.id = 'chrome-extension-content-react-widget' // FIXME RENAME
document.body.appendChild(divHTMLElement)

ReactDOM
  .createRoot(divHTMLElement)
  .render(<App />)
