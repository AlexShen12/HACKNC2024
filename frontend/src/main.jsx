import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './routes/login/Login'
import Courses from './routes/courses/course'
import Profile, { profileLoader } from './routes/profile/profile'
import EditProfile from './routes/profile/editpro'

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
  },
  {
    path: "profile/:id",
    element: (<Profile />),
    loader: profileLoader
  },
  { 
    path: "editprofile",
    element: (<EditProfile />)
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
