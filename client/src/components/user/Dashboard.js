import React from 'react'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';

const Dashboard = () => {
    const [auth, setAuth] = useAuth();


    return (
        <>
            {/* <pre>
            {JSON.stringify(auth, null, 4)}
            <h1>this is user dashboard</h1>

        </pre> */}


            <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">



                <div className='w-[30%]'>
                    <UserMenu />
                </div>


                <div className=' w-[70%] w-full bg-red-500 '>
                    <h1> right side  </h1>
                </div>



            </div>

        </>
    )
}

export default Dashboard