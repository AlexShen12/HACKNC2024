import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './routes/login/Login'
import Courses from './routes/courses/course'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />),
    loader: async () => { return "hello"},
  },
  {
    path: "test",
    element: (<div>test</div>)
  },
  {
    path: "login",
    element: (<Login />)
  },
  {
    path: "course-search",
    element: (<Courses />)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
