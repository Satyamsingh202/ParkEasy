// Application bootstrap — mounts the root React component into the DOM
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Render inside StrictMode for development-time warnings on unsafe lifecycles
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
