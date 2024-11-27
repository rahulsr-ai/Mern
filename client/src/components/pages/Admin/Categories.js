import React, { useState } from 'react'
import AdminMenu from '../AdminMenu'
import { useEffect } from 'react'
import axios from "axios"
import CreateCategory from "./CreateCategory"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd';


const Categories = () => {

    const navigate = useNavigate()
    const [item, setItem] = useState([])
    const [name, setName] = useState("")
    const [select, setSelect] = useState(null)

    const [updateName, setUpdateName] = useState("")
    const [Delete, setDelete] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);




    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/catergory/get-allCatogory")
           

            // if (data?.success) {
               
                setItem(data.category)
                navigate("/dashboard/admin/categories")
              
            // }



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
            // console.log(`/api/v1/auth/catergory/update-category/${select}`);
            console.log(updateName);

            const { data } = await axios.put(`/api/v1/auth/catergory/update-category/${select}`, { name: updateName })


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




    const handleDelete = async (e) => {
        // e.preventDefault();
        try {


            const { data } = await axios.delete(`/api/v1/auth/catergory/delete-category/${select}`)


            if (data?.success) {
                toast.success(`${Delete} is deleted`)
                setSelect(null)
                setDelete("")
                setIsModalOpen(false)
                getAllCategories()



            } else {
                toast.error("error while deleting the category")
            }



        } catch (error) {
            console.log("error got catch something went wrong while deleting categories");
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
                    <tbody>
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
                                        <Button type="primary" onClick={() => {
                                            setIsModalOpen(true); setUpdateName(item.name);
                                            setSelect(item._id)


                                        }}>
                                            Edit Category
                                        </Button>
                                    </td>

                                    <td>
                                        <Button type="link" onClick={() => {
                                            setIsModalOpen(true); setDelete(item.name);
                                            setSelect(item._id)
                                            console.log(item._id);

                                        }}>
                                            delete category
                                        </Button>
                                    </td>

                                    {!Delete ?
                                        <td>
                                            <Modal title={"edit category"} open={isModalOpen}
                                                onOk={() => {
                                                    setDelete(null)
                                                    return setIsModalOpen(false)
                                                }}
                                                onCancel={() => {
                                                    setDelete(null)
                                                    return setIsModalOpen(false)
                                                }
                                                } footer={null}

                                            >
                                                <CreateCategory value={updateName}
                                                    setValue={setUpdateName}
                                                    handleSubmit={handleUpdate}
                                                />

                                            </Modal>
                                        </td> :
                                        <td>

                                            <Modal title={"Delete category"} open={isModalOpen}
                                                onOk={() => {
                                                    setDelete(null)
                                                    return setIsModalOpen(false)
                                                }}
                                                onCancel={() => {
                                                    setDelete(null)
                                                    return setIsModalOpen(false)
                                                }
                                                } footer={null}

                                            >
                                                <div className="flex flex-col items-center justify-center gap-3">

                                                    <h1 className="text-semibold ">  Do you want to delete <span className="text-red-600"> {item.name} </span> category </h1>


                                                    <div className="p-2 space-x-4">
                                                        <button onClick={() => { handleDelete() }} className="px-4 text-white py-1 bg-green-500 rounded " > Confirm </button>
                                                        <button onClick={() => setIsModalOpen(false)} className="px-4 text-white py-1 bg-red-500 rounded " > Cancel </button>
                                                    </div>
                                                </div>


                                            </Modal>


                                        </td>
                                    }





                                </tr>

                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default Categories