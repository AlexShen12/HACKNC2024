import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './routes/account/login'
import Signup from './routes/account/signup'
import Courses, { courseLoader } from './routes/courses/course'
import Profile, { profileLoader } from './routes/profile/profile'
import EditProfile, { editProfileLoader } from './routes/profile/editProfile'
import CoursePage, { coursePageLoader } from './routes/courses/courseStudents'

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
    path: "signup",
    element: (<Signup />)
  },
  {
    path: "login",
    element: (<Login />)
  },
  {
    path: "courses/search",
    element: (<Courses />),
    loader: courseLoader
  },
  {
    path: "courses/:id",
    element: (<CoursePage />),
    loader: coursePageLoader
  },
  {
    path: "profile/:id",
    element: (<Profile />),
    loader: profileLoader,
  },
  {
    path: "profile/edit/:id",
    element: (<EditProfile />),
    loader: editProfileLoader
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
