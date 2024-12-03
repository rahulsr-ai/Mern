import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMenu from '../AdminMenu'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


import { Button, Modal } from 'antd';
import axios from 'axios'

const UpdateProduct = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("")
    const [description, setdescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState({})
    const [shipping, setShipping] = useState("")
    const [categoryy, setCategoryy] = useState("")
    const [id, setId] = useState("")

    const [item, setItem] = useState([])






    // single product data function to send request to backend
    async function GetSingleProduct() {
        try {


            console.log('fetching request... ');

            const { data } = await axios.get(`/api/v1/auth/product/get-product/${params.slug}`)
            console.log('request fetched successfully');

            console.log(data.Product);

            setName(data.Product.name)
            setdescription(data.Product.description)
            setPrice(data.Product.price)
            setQuantity(data.Product.quantity)
            setId(data.Product._id)
            setShipping(data.Product.shipping)

        } catch (error) {
            console.log("error while getting single product data");
            console.log(error);

        }
    }

    // --------------------------------------------------------------------------



    // get all categories data function to send request to backend
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


    // --------------------------------------------------------------------------------


    // update the product data function to send request on backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {


            console.log(shipping);


            const productData = new FormData();
            productData.append("name", name)
            productData.append("description", description)
            productData.append("photo", photo)
            productData.append("shipping", shipping)
            productData.append("quantity", quantity)
            productData.append("price", price)
            productData.append("categoryy", categoryy)



            const { data } = await axios.post(`/api/v1/auth/product/update-product/${id}`, productData)
            console.log(data);

            if (data?.success) {
                toast.success("successully updated product data")
                navigate("/dashboard/admin/GetProduct")
            } else {
                toast.error("failed to update product data")

            }



        } catch (error) {
            toast.error("something went wrong ")
            console.log(error);

        }


    }


    // -----------------------------------------------------------------------------------



    // set image in setPhoto function 
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const newPhotoURL = URL.createObjectURL(file);
            setPhoto(file)
            // setPhotoPre(newPhotoURL)

            // Clean up the URL when no longer needed
            return () => URL.revokeObjectURL(newPhotoURL);
        }
        console.log(photo);

    }



    // ----------------------------------------------------------------



    //  send delete request function to the backend  
    const deleteProduct = async () => {

        try {
            const { data } = await axios.delete(`/api/v1/auth/product/delete-product/${id}`)

            if (data?.success) {
                toast.success("successully deleted product ")
                navigate("/dashboard/admin/GetProduct")
            } else {
                toast.error("something went wrong while deleting the product")
                console.log("something went wrong while deleting the product ");
            }


        } catch (error) {

            console.log("failed to delete product ");
            console.log(error);

        }
    }



    useEffect(() => {
        GetSingleProduct()
        getAllCategories()

    }, [])


    // -------------------------------------------------------------------------------------------------------


    return (

        <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">

            <div className='w-[30%]'>
                <AdminMenu />
            </div>





            <div className=' w-[70%] w-full  '>
                <h1> update product side  </h1>

                <div className="border-2 space-y-4  border-red-500 p-2 ">

                    <select className="w-full " onChange={(e) => { setCategoryy(e.target.value) }}
                        defaultValue={categoryy.name}
                        title="Select the Category"

                    >
                        <option value="" >select category </option>
                        {item.map((product) => (
                            <option className='w-full' value={product._id}> {product.name} </option>
                        ))}
                    </select>



                    <input type="file" onChange={onImageChange} className="filetype" />

                    <img className='size-[100px] '
                        onerror={`/api/v1/auth/product/Photo-Product/${id}`}
                        src={photo ? photo : `/api/v1/auth/product/Photo-Product/${id}`}

                        alt=""
                    />

                    <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                    <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="text" placeholder="description" onChange={(e) => setdescription(e.target.value)} defaultValue={description} />
                    <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} defaultValue={price} />
                    <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="number" placeholder="quantity" onChange={(e) => setQuantity(e.target.value)} defaultValue={quantity} />

                    <label htmlFor="shipping">Shipping:</label>
                    <select
                        id="shipping"
                        value={shipping}
                        onChange={(e) => setShipping(e.target.value)}
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>


                    <input onClick={handleSubmit} type="submit" className="px-4 py-1 bg-blue-400" value="Create" />


                </div>


                <Modal title={"Delete Product"} open={isModalOpen}
                    onOk={() => {
                        return setIsModalOpen(false)
                    }}
                    onCancel={() => {
                        return setIsModalOpen(false)
                    }
                    } footer={null}
                    className=''

                >


                    <label htmlFor="confirmation"> Do you want to delete {name} product</label>



                    <Button className='block my-3 '
                        onClick={() => {
                            setIsModalOpen(true)
                            deleteProduct()
                        }
                        }
                    > Confirm </Button>

                </Modal>


                <button onClick={() => {
                    setIsModalOpen(true)

                }}> Delete  </button>




            </div>

        </div >
    )
}

export default UpdateProduct