import React, { useState, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"





const { Option } = Select
const CreateProduct = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setdescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shiping, setShiping] = useState("")
  const [photo, setPhoto] = useState({})
  const [photoPre, setPhotoPre] = useState("")
  const [categoryy, setCategoryy] = useState("")


  const [item, setItem] = useState([])

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/catergory/get-allCatogory")
      console.log(data?.category);

      if (data.success) {

        setItem(data.category)

      }
      // console.log(item[0].name);



    } catch (error) {
      console.log("error while getting category data");
      console.log(error);

    }
  }




  useEffect(() => {
    getAllCategories()


  }, [])




  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newPhotoURL = URL.createObjectURL(file);
      setPhoto(file)
      setPhotoPre(newPhotoURL)

      // Clean up the URL when no longer needed
      return () => URL.revokeObjectURL(newPhotoURL);
    }
    console.log(photo);

  }





  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("photo", photo)
      productData.append("shiping", shiping)
      productData.append("quantity", quantity)
      productData.append("price", price)
      productData.append("categoryy", categoryy)

      console.log("category is ", categoryy);
      console.log("photo is ", photo);
      console.log("shping is ", shiping);

      const response = await axios.post("/api/v1/auth/product/create-product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log(response);

      if (response.data?.success) {
        toast.success("successully created product data")
        navigate("/dashboard/admin/GetProduct")
      } else {


        toast.error("failed to create Product data")
      }



    } catch (error) {
      toast.error("something went wrong ")
      console.log(error);

    }


  }

  return (
    <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">

      <div className='w-[30%]'>
        <AdminMenu />
      </div>





      <div className=' w-[70%] w-full  '>
        <h1> Create Product  </h1>


        <div className="border-2 space-y-4  border-red-500 p-2 ">

          {/* <Select className="w-full" onchange={(e) => { setCategory(e.target.value) }}>
            {item.map((product) => (
              <Option key={product._id} className="w-full" value={product._id}>
                {product.name}
              </Option>
            ))}

          </Select> */}


          <select className="w-full " onChange={(e) => { setCategoryy(e.target.value) }} >
            {item.map((product) => (
              <option key={product._id} className='w-full' value={product._id}> {product.name} </option>
            ))}
          </select>

          {/* <form onClick={handleSubmit} className="p-2 border-2 border-green-500 flex flex-col gap-4 items-center justify-center"> */}
          {/* <input type="file" accept="image/*" name="photo" onchange={(e) => { setPhoto(e.target.files[0]) }} /> */}


          <input type="file" onChange={onImageChange} className="filetype" />

          <img className="max-w-[100px]" alt="preview image" src={photoPre}
          />

          <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
          <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="text" placeholder="description" onChange={(e) => setdescription(e.target.value)} />
          <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
          <input className="px-4 py-1 rounded my-1 bg-zinc-200" type="number" placeholder="quantity" onChange={(e) => setQuantity(e.target.value)} />

          <select name="shiping" onChange={(e) => {
            setShiping(e.target.value)
          }}>
            <option value="1">Yes</option>
            <option value="0">No</option>

          </select>


          <input onClick={handleSubmit} type="submit" className="px-4 py-1 bg-blue-400" value="Create" />
          {/* </form> */}

        </div>








      </div>















    </div>

  )
}

export default CreateProduct