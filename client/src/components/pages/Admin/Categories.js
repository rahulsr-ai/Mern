import React, { useState } from 'react'
import AdminMenu from '../AdminMenu'
import { useEffect } from 'react'
import axios from "axios"
import CreateCategory from "./CreateCategory"
import toast from 'react-hot-toast'

import { Button, Modal } from 'antd';


const Categories = () => {
    const [item, setItem] = useState([])
    const [name, setName] = useState("")
    const [select, setSelect] = useState(null)

    const [updateName, setUpdateName] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);




    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/catergory/get-allCatogory")
            console.log(data?.category);

            if (data.success) {
                // setItem( [...item, data.category])
                // setItem(() => [...item, ...data.category])
                setItem(data.category)
                // console.log(item)
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





    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // console.log(select);
            const { data } = await axios.put(`/api/v1/auth/catergory/update-category/${select._id}`, { name: updateName })

            if (data?.success) {
                toast.success(`${updateName} is updated`)
                setSelect(null)
                setUpdateName("")
                setIsModalOpen(false)
                getAllCategories()

            } else {
                toast.error("error while Updating category")
            }



        } catch (error) {
            console.log("something went wrong while editing user categories");
            console.log(error);

        }
    }

    return (
        <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">



            <div className='w-[30%]'>
                <AdminMenu />
            </div>


            <div className=' w-[70%] w-full border-2  '>
                <h1> categories page for admin </h1>
                {/* {item} */}

                <CreateCategory handleSubmit={submitHandler} setValue={setName} value={name} />

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
                                    <Button type="primary" onClick={() => { setIsModalOpen(true); setUpdateName(item.name); 
                                         setSelect(item)
                                    }}>
                                        Edit Category
                                    </Button>
                                </td>


                                <td>
                                    <Modal title="Edit Category" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} footer={null}

                                    >
                                        <CreateCategory value={updateName} setValue={setUpdateName}
                                            handleSubmit={handleUpdate}
                                        />

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