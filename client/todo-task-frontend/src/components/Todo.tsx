import { FormEventHandler, MouseEventHandler } from 'react'
import { FaTrash } from 'react-icons/fa'

interface props {
  data: any
  deleteTodo: MouseEventHandler
  toggleDone: FormEventHandler
  index: number
}

export default function Todo({ data, deleteTodo, index, toggleDone }: props) {
  // let backgroundColor: string = 'bg-black'
  // if (index % 2 === 0) {
  //   backgroundColor = 'bg-indigo-400'
  // } else {
  //   backgroundColor = 'bg-black'
  // }
  return (
    <>
      <div className="p-4 flex items-center w-full">
        <input
          type="checkbox"
          name=""
          id=""
          className="p-2 m-2"
          onChange={toggleDone}
          checked={data.done}
        />
        <p className={data.done ? 'line-through' : ''}>{data.text}</p>
        <button onClick={deleteTodo} className="hover:text-red-600 ml-auto">
          <FaTrash />
        </button>
      </div>
      <hr className="border-orange w-full" />
    </>
  )
}
