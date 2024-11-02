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
        <p>HeelStudy</p>
        {data.auth && (
          <div>
            <p>Login</p>
            <p>Sign in</p>
          </div>
        )}

        {data.auth || (
          <div>


          </div>
        )}

      </nav>
      <div>
        <Outlet />
      </div>
    </>
  )
}