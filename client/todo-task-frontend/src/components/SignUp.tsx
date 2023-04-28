import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function setEmailInput(e: any) {
    setEmail(e.target.value)
  }

  function setPasswordInput(e: any) {
    setPasword(e.target.value)
  }

  function setPasswordConfirmInput(e: any) {
    setConfirmPassword(e.target.value)
  }

  async function signup(e: any) {
    try {
      e.preventDefault()
      if (password !== confirmPassword) throw new Error("Passwords don't match")
      await axios.post(`${process.env.API}/user/signup`, { email, password })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl m-3 text-gray-400 pb-5">Signup</h1>
      <form
        onSubmit={signup}
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
        <input
          className="button"
          type="password"
          name="password"
          id="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setPasswordConfirmInput}
        />
        <span className="text-left w-[400px] text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login">
            <u>Login</u>
          </Link>
        </span>
        <button
          type="submit"
          className="p-3 bg-white w-[250px] rounded-lg text-black"
        >
          Register
        </button>
      </form>
    </div>
  )
}
