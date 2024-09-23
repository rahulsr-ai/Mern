import React, { useState } from 'react'
import "./register.css"
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const navigate = useNavigate() // Initialize navigate function
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setaddress] = useState("")


    const submithandle = async (e) => {
        e.preventDefault();

        
        try {
            const response = await axios.post(`/api/v1/auth/register`,
                { name, email, password, phone, address });
                if (response.data.success) {
                    navigate("/login"); }
                    toast.success('successfully submited');
                    

        } catch (error) {
            toast.error("Error while submitting the form");
            console.error("Error in register:", error);
        }
    }


    return (


        <div className='formdiv '>

            <form onSubmit={submithandle}  className='registerForm flex flex-col gap-5 w-full justify-center items-center
    h-full  py-10'>

                <h1 className='text-4xl title'> Register  </h1>

                <input className='nameInput px-4 max-w-[50%] py-2 rounded-md outline-none bg-snow-200 mt-[20px]'
                    value={name}
                    required name="name" placeholder='Enter your name' type="text"
                    onChange={(e) => {
                        setName(e.target.value.trim())
                    }}
                />

                <input className='px-4 max-w-[50%] py-2 rounded-md outline-none bg-snow-200 ' required name="email" placeholder='Email' type="email" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value.trim())
                    }}
                />

                <input className='px-4 max-w-[50%] py-2 rounded-md outline-none bg-snow-200 ' required name="password" placeholder='Password' type="password" value={password}
                    onChange={(e) => {
                        setPassword(e.target.value.trim())
                    }}
                />

                <input className='px-4 max-w-[50%] py-2 rounded-md outline-none bg-snow-200 ' required name="number" placeholder='Enter your number' type="text" value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value.trim())
                    }}
                />

                <input className='px-4 max-w-[50%] py-2 rounded-md outline-none bg-snow-200 ' required name="address" placeholder='Enter your address' type="text" value={address}
                    onChange={(e) => {
                        setaddress(e.target.value.trim())
                    }}
                />

                <input type='submit' value="Submit" className='submitBtn px-5 max-w-[20%] py-2 rounded-md' />

            </form>


        </div>

    )
}

export default RegisterForm