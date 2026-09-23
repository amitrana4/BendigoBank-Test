import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Mounts the React application tree into the HTML DOM root container
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode highlights potential runtime problems during local development
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
