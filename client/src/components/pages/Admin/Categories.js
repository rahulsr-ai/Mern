import React, { useState } from 'react'
import AdminMenu from '../AdminMenu'
import { useEffect } from 'react'
import axios from "axios"
import CrateCategory from './CrateCategory'
import toast from 'react-hot-toast'

import { Button, Modal } from 'antd';


const Categories = () => {
    const [item, setItem] = useState([])

    const [name, setName] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/catergory/get-allCatogory")
            console.log(data?.category);

            if (data.success) {
                // setItem( [...item, data.category])
                // setItem(() => [...item, ...data.category])
                setItem(data.category)
                console.log(item)
            }



        } catch (error) {
            console.log("error while getting category data");
            console.log(error);

        }
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/auth/catergory/create-catogory", { name })
            if (data.success) {
                toast.success("category Created successfully")
            } else {
                toast.error("error while creating category")
            }
        } catch (error) {
            console.log("something went wrong while creating categories");
            console.log(error);

        }
    }


    useEffect(() => {
        getAllCategories()

    }, [])


    return (
        <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">



            <div className='w-[30%]'>
                <AdminMenu />
            </div>


            <div className=' w-[70%] w-full border-2  '>
                <h1> categories page for admin </h1>
                {/* {item} */}

                <CrateCategory submitHandler={submitHandler} setName={setName} name={name} />

                <table className='border-2 border-black w-full p-4 '>
                    <tr>
                        <th>name</th>
                        <th>action</th>
                    </tr>
                    <tr>
                        {item.map((item, i) => (

                            <tr key={i}>
                                <td key={item._id}>
                                    {item.name}
                                </td>

                                <td>
                                    <Button type="primary" onClick={showModal}>
                                        Edit Category
                                    </Button>
                                </td>


                                <td>
                                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </td>


                            </tr>

                        ))}
                    </tr>
                </table>
            </div>



        </div>

    )
}

export default Categories