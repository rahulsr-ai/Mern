import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ReDirecting = ({path="login"}) => {


    const navigate = useNavigate()
    const [count, setCount] = useState(5)

   

    
    

    useEffect(() => {

    

        let interval = setInterval(() => {
            setCount((count) => --count)
            if (count === 0) {
                navigate(`/${path}`)
            }
        }, 1000)

        return () => clearInterval(interval)



    }, [count, navigate,path]);




    return (
        <div className='flex pt-20 text-3xl font-normal bg-zinc-800 
        text-blue-400 h-screen justify-center  w-full'>
            Redirecting {count}
        </div>
    )
}

export default ReDirecting