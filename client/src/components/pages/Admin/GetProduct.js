import React, { useState, useEffect } from 'react'
import AdminMenu from '../AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
const GetProduct = () => {

  const [allProduct, setAllProduct] = useState([])

  const getAllProductData = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/product/get-product")
      console.log(data);
      setAllProduct(data.Products)
      console.log(data?.Products);



    } catch (error) {
      console.log("error while getting product data");
      console.log(error);

    }
  }

  console.log(allProduct);



  useEffect(() => {
    getAllProductData();

  }, [])

  return (
    <div className="flex shadow-md rounded mx-auto my-10 border-2 border-black w-[80vw]  dbcontainer">



      <div className='w-[30%] '>
        <AdminMenu />
      </div>


      <div className=' w-[70%] w-full flex flex-col items-center justify-center gap-4 '>
        {allProduct.map((item) => (
          <> 
          <Link to={`/dashboard/admin/product/${item.slug}`} key={item._id}>
            {item.name}

          </Link>
            <img className='size-[100px] ' src={`/api/v1/auth/product/Photo-Product/${item._id}`} alt="" />
          </>
        ))}
      </div>




    </div>
  )
}

export default GetProduct