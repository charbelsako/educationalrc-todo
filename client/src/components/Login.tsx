import { Link } from 'react-router-dom'

function login() {
  return false
}

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl m-3 text-gray-400 pb-5 pt-5">Login</h1>
      <form
        onSubmit={login}
        className="flex flex-col m-1 p-2 space-y-6 w-[600px] items-center"
      >
        <input type="text" className="button" placeholder="Email" />
        <input
          className="button"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
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
