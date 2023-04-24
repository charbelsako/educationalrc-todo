import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo'

// interface todo {
//   text: String
// }

// interface todoType {
//   todos: Array<todo>
//   setTodos: Function
// }

export default function Dashboard() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<any>([])

  function setTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  useEffect(() => {
    // fetch all todos
    axios
      .get('http://localhost:5000/todo?limit=10&page=1', {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data)
        setTodos(data.data.items)
      })
  }, [])

  async function createTodo(e: React.FormEvent) {
    try {
      e.preventDefault()
      const todo = await axios.post(
        'http://localhost:5000/todo/create',
        {
          text,
        },
        {
          withCredentials: true,
        }
      )

      const arr = [todos, todo.data]
      setTodos(arr)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <form
        onSubmit={createTodo}
        className="w-full flex justify-center items-center"
      >
        <div className="p-4 rounded-md w-[600px] bg-gray-600 flex items-center m-5">
          <input
            type="text"
            className="bg-transparent w-full p-4"
            placeholder="Enter todo text"
            value={text}
            onChange={setTextInput}
          />
          <button
            type="submit"
            className="p-1 bg-white w-[100px] h-[50px] rounded-lg text-black"
          >
            Create
          </button>
        </div>
      </form>
      <div className="flex w-[600px] flex-col items-start">
        {todos.map((todo: any, index: number) => (
          <Todo data={todo} key={index} />
        ))}
      </div>
    </div>
  )
}
