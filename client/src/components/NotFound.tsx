import React from 'react'
import { useRouteError } from 'react-router'

export default function NotFound() {
  const error = useRouteError()
  console.log(error)
  return <div className="text-3xl p-5">Route Not Found</div>
}
