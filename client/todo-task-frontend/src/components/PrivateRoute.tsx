import { Navigate } from 'react-router-dom'
import React from 'react'

interface props {
  Component: React.FunctionComponent
  isAuthenticated: Boolean
}

export default function PrivateRoute({
  Component,
  isAuthenticated,
}: props): React.ReactElement {
  if (!isAuthenticated) {
    console.log(isAuthenticated)
    return <Navigate to="/login" />
  }

  return <Component />
}
