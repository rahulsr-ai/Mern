// import React from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth'

import { useEffect, useState } from "react"

import { Checkbox, Radio } from 'antd';
import { Prices } from '../Prices';

// const Homepage = () => {
//   const [auth, setAuth] = useAuth()


//   return (
//     <div className='min-h-screen w-full bg-zinc-300 text-black p-10'>
//       home pages
//       <pre>
//         {JSON.stringify(auth, null, 4)}

//       </pre>
//     </div>
//   )
// }

// export default Homepage     


const Homepage = () => {
  // const [auth, setAuth] = useAuth()
  const [allProduct, setAllProduct] = useState([])
  const [allCatogory, setAllCategory] = useState([])
  const [categoryId, setcategoryId] = useState("")


  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])


  const findProductByCategory = async () => {
    try {

      const response = await axios.get(`/api/v1/auth/catergory/get-allCategory/${categoryId}`)
      console.log(response.data.category);
      setAllCategory(response.data.category)

    } catch (error) {
      console.log(error);
      console.log("error while getting category data");

    }
  }


  // getAllProductData from backend 
  const getAllProductAndCategoryData = async () => {

    try {

      const { data } = await axios.get(`api/v1/auth/product/get-product`)

      console.log(data.Products);
      setAllProduct(data.Products)

      const response = await axios.get("/api/v1/auth/catergory/get-allCategory")
      console.log(response.data.category);
      setAllCategory(response.data.category)




    } catch (error) {
      console.log("error while getting product and category data");
      console.log(error);

    }

  }



  // getAllCategoryData from the backend 
  // Async function to fetch all category data



  console.log(allCatogory);
  console.log(allProduct);


  // ----------------------------------------








  const filterProduct = (value, id) => {
  
    console.log(value);
    console.log(id);






    let newProuduct = [...checked]
    if (value) {
      newProuduct.push(id)


    } else {
      newProuduct = allProduct.filter((item) => item !== id)
    }
    console.log(checked);
    setChecked(newProuduct)

  }


  // --------------------------------------

  useEffect(() => {

    getAllProductAndCategoryData()

  }, [])

  console.log(JSON.stringify(checked, null, 4));


  console.log(radio);


  return (
    <div className='flex  w-full'>

      <div id='left-side' className='min-h-screen w-[25vw] p-6 border-2 border-red-500 flex flex-col
      gap-2 items-center'>

        <h1> Categories </h1>



        {allCatogory?.map((item) => (
          <Checkbox key={item._id} onChange={(e) => filterProduct(e.target.checked, item._id)}> {item.name} </Checkbox>

        ))}

        <div>
          <h1> Filter By Price  </h1>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((item) => (
              <div key={item._id}>
                <Radio value={item.array}> {item.name} </Radio>
              </div>
            ))}

          </Radio.Group>
        </div>


      </div>
      <div id='right-side' className='min-h-screen w-full p-6 flex flex-col gap-6 items-center border-2 border-gray-200'>

        <h1 className='text-3xl font-semibold text-gray-800 mb-4'>All Products</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full h-full'>

          {allProduct.map((item, i) => (
            <div key={i} className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105'>

              <div className='w-full h-64 bg-gray-200'>
                <img
                  className='w-full h-full object-cover'
                  src={`/api/v1/auth/product/Photo-Product/${item._id}`}
                  alt={item.name}
                  onError={(e) => e.target.src = '/fallback-image.jpg'} // Fallback image if the source fails
                />
              </div>

              <div className='p-4'>
                <h2 className='text-xl font-medium text-gray-800'>{item.name}</h2>
                <p className='text-sm text-gray-600 mt-2'>{item.description}</p>
                <h4 className='text-lg font-semibold text-blue-500 mt-4'>${item.price}</h4>
              </div>

            </div>
          ))}

        </div>

      </div>





    </div>

  )
}

export default Homepage   
