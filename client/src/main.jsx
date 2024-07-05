import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthenticationProvider } from './context/AuthenticationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthenticationProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </AuthenticationProvider>
)
