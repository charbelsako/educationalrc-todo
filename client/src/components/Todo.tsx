import React from 'react'

interface props {
  data: any
}

export default function Todo({ data }: props) {
  return (
    <div className="p-2 flex space-x-3">
      <input type="checkbox" name="" id="" />
      <p>{data.text}</p>
    </div>
  )
}
