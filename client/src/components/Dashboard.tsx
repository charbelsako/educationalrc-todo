import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface TodoType {
  text: String
  _id: String
  done: boolean
}

// interface todoType {
//   todos: Array<todo>
//   setTodos: Function
// }

export default function Dashboard() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<any>([])
  const [hidden, setHidden] = useState(false)
  const [numCompleted, setNumCompleted] = useState(0)

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
        let count = 0
        data.data.items.map((item: TodoType) => (item.done ? count++ : null))
        setNumCompleted(count)
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
      console.log(todo.data)
      const arr = [...todos, todo.data.item]
      setTodos(arr)
      setText('')
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteTodo(id: String) {
    try {
      console.log('deleting ', id)
      const result = await axios.delete(`http://localhost:5000/todo/${id}`, {
        withCredentials: true,
      })
      // delete from state
      console.log(result.data)
      setTodos(todos.filter((item: TodoType) => item._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  async function markDone(id: String, done: Boolean) {
    try {
      console.log('marking as done ', id)
      const result = await axios.put(
        `http://localhost:5000/todo/${id}`,
        { done: !done },
        {
          withCredentials: true,
        }
      )
      // mark as done from state
      console.log(result.data)
      let newArr = todos.map((item: TodoType) =>
        item._id === id ? { ...item, done: !done } : item
      )
      setTodos(newArr)
      setNumCompleted((prevState) => (!done ? prevState + 1 : prevState - 1))
    } catch (err) {
      console.error(err)
    }
  }

  function toggleHide() {
    setHidden((prevState) => !prevState)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex items-end w-[600px] mt-10">
        <p className="text-xs mr-auto">{numCompleted} Completed</p>
        <button
          className="bg-gray-300/40 text-black rounded-md p-2 flex items-center space-x-3"
          onClick={toggleHide}
        >
          {hidden && (
            <>
              <FaEye /> <p>Unhide Completed</p>
            </>
          )}
          {!hidden && (
            <>
              <FaEyeSlash /> <p>Hide Completed</p>
            </>
          )}
        </button>
      </div>

      <div className="flex w-[600px] flex-col items-start">
        {todos.map((todo: any, index: number) => {
          if (hidden && todo.done) return null
          return (
            <Todo
              data={todo}
              key={index}
              deleteTodo={() => deleteTodo(todo._id)}
              index={index}
              toggleDone={() => markDone(todo._id, todo.done)}
            />
          )
        })}
      </div>
      <form
        onSubmit={createTodo}
        className="w-full flex justify-center items-center"
      >
        <div className="p-2 rounded-md w-[600px] bg-gray-600 flex items-center m-5">
          <input
            type="text"
            className="bg-transparent w-full"
            placeholder="Enter todo text"
            value={text}
            onChange={setTextInput}
          />
          <button
            type="submit"
            className="p-1 bg-white w-[200px] h-[50px] rounded-lg text-black"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
