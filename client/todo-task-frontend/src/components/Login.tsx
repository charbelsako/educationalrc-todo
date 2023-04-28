import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [isAuthenticated, setAuth] = useState(false)

  async function login(e: any) {
    e.preventDefault()
    console.log(email, password)
    try {
      const result = await axios.post(
        'https://educationalrc-todo.vercel.app/user/login',
        {
          username: email,
          password,
        },
        { withCredentials: true }
      )
      localStorage.setItem('user', result.data.user)
      setAuth(true)
    } catch (err) {
      console.error(err)
    }
  }

  function setEmailInput(e: any) {
    setEmail(e.target.value)
  }

  function setPasswordInput(e: any) {
    setPasword(e.target.value)
  }

  return (
    <div className="flex flex-col items-center">
      {isAuthenticated && <Navigate to="/" />}
      <h1 className="text-4xl m-3 text-gray-400 pb-5 pt-5">Login</h1>
      <form
        onSubmit={login}
        className="flex flex-col m-1 p-2 space-y-6 w-[600px] items-center"
      >
        <input
          type="text"
          className="button"
          placeholder="Email"
          value={email}
          onChange={setEmailInput}
        />
        <input
          className="button"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={setPasswordInput}
        />
        <span className="text-left w-[400px] text-xs text-gray-400">
          Don't have an account yet?{' '}
          <Link to="/signup">
            <u>Signup</u>
          </Link>
        </span>
        <button
          type="submit"
          className="p-3 bg-white w-[250px] rounded-lg text-black"
        >
          Login
        </button>
      </form>
    </div>
  )
}
