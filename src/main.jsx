import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import{BrowserRouter} from 'react-router-dom'
import UserProvider from './Context/UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>,
)
