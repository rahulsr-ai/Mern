import React from 'react'
import { useAuth } from '../../context/auth'

const Homepage = () => {
  const [auth, setAuth] = useAuth()


  return (
    <div className='min-h-screen w-full bg-zinc-300 text-black p-10'>
      home pages
      <pre>
        {JSON.stringify(auth, null, 4)}

      </pre>
    </div>
  )
}

export default Homepage     