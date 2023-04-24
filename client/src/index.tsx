import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './components/NotFound'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

const user = localStorage.getItem('user')

let isAuthenticated
if (user) {
  isAuthenticated = true
} else {
  isAuthenticated = false
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute Component={Dashboard} isAuthenticated={isAuthenticated} />
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: (
      <PrivateRoute Component={Login} isAuthenticated={isAuthenticated} />
    ),
  },
])
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
