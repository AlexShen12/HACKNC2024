import { useState } from 'react'
import './root.css'
import { useLoaderData } from 'react-router-dom'
import { Outlet } from "react-router-dom"

type Authenticated = {
  auth: boolean
};

async function getAuth(): Promise<Authenticated> {
  return {auth: true};
}

export async function rootLoader(): Promise<Authenticated> {
  return await getAuth();
}

export default function App() {

  const data: Authenticated = useLoaderData() as Authenticated

  return (
    <>
      <nav>
        <p className='logo'>HeelStudy</p>
        {data.auth && (
          <div>
            <p className='searchbutton'>Login</p>
            <p className='searchbutton'>Sign in</p>
          </div>
        )}

        {data.auth || (
          <div>
            <p className='searchbutton'>Sign out</p>
            <p className='searchbutton'>Profile</p>
          </div>
        )}

      </nav>
      <div>
        <Outlet />
      </div>
    </>
  )
}