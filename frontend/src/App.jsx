import { useState } from 'react'
import './App.css'
import { useLoaderData } from 'react-router-dom'
import { Outlet } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  const data = useLoaderData();

  return (
    <>
      <div>{data}</div>

      <h1>HeelStudy</h1>
      <h2>Find those with similar passion idk</h2>
      <div className="card logo">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
