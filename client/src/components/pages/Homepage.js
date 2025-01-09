// import React from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth'

import { useEffect, useState, useRef } from "react"

import { Checkbox, Radio } from 'antd';
import { Prices } from '../Prices';
import { useSearch } from '../../context/SearchContext';


import { toast } from 'react-hot-toast';

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// import CardComponent from "../UiVerseCompo/Card.js"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom"
import { useCart } from '../../context/AddToCardContext';



const Homepage = () => {
  const [searchValue] = useAuth()

  const [cart, setCart] = useCart()

  const [search, setsearch] = useSearch()


  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [resetValue, setResetValue] = useState(false)

  const navigate = useNavigate()


  // Fetch Product and Category Data from Backend
  const getAllProductAndCategoryData = async () => {

    try {
      const productResponse = await axios.get(`api/v1/auth/product/get-product`);
      setAllProduct(productResponse.data.Products);
      console.log("data from getAll Product and category data");
      console.log(productResponse.data);


      const categoryResponse = await axios.get("/api/v1/auth/catergory/get-allCategory");
      setAllCategory(categoryResponse.data.category);

      setTimeout(() => {
        console.log(allCategory);
      }, 2000)

    } catch (error) {
      console.log("Error fetching product and category data", error);
    }
  };

  const findProductBySearch = async () => {
    console.log('inside the findbyProduct function');
    console.log(searchValue);

  }



  // Trigger filter when checked categories or radio price range changes
  const filterProduct = async () => {
    if (checked.length > 0 || radio.length) {
      try {
        const filterData = { categories: checked, priceRange: radio };


        const { data } = await axios.post("/api/v1/auth/product/product-filter", filterData);
        setAllProduct(data.filteredProducts); // Assuming the response has the filtered products


        console.log("data from filterProduct");
        console.log(data);

      } catch (error) {
        console.log("Error fetching filtered products:", error);
      }
    }
  };



  // Effect to fetch products and categories on initial load
  useEffect(() => {
    if (checked.length > !0) {
      getAllProductAndCategoryData();
    }


    if (searchValue.length > 0) {
      console.log('inside the conditon');
      findProductBySearch()

    }


  }, []);






  // Effect to filter products whenever checked or radio state changes
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {

      getAllProductAndCategoryData();
    }
  }, [checked, radio]);







  // Handle checkbox changes (category filtering)
  const handleCategoryChange = (checkedValue, id) => {
    if (checkedValue) {

      setChecked((prev) => [...prev, id]);
    } else {
      checked.pop()
      setChecked((prev) => prev.filter((categoryId) => categoryId._id !== id));
      getAllProductAndCategoryData();
    }
  };





  // Handle radio button changes (price filtering)
  const handlePriceChange = (value) => {
    setRadio(value); // Assuming value is an array like [50, 100]
  };

  const checkboxRef = useRef()
  const radioRef = useRef()


  const resetFilter = () => {
    setRadio([])
    setChecked([])

    window.location.reload()
    // checkboxRef.current.checked = false
    // setResetValue(false)
  }


  const addtoCart = (item) => {
    // const { _id, } = item
    // alert(_id)
    setCart([...cart, item])
    toast.success("data set to cart")

    
  }


  // function to direct on details page of specific product 
  const DetailsHandle = (item) => {
    // const { _id, } = item
    // alert(_id)

    const dataToSend = item
    navigate('dashboard/user/Product-details', { state: dataToSend });
  }

  return (
    <div className="flex w-full">

      <div id="left-side" className="min-h-screen w-[25vw] p-6 border-2 border-red-500 flex flex-col gap-2 items-center">
        <h1>Categories</h1>
        {allCategory.map((item) => (
          <Checkbox ref={checkboxRef} key={item._id} onChange={(e) => handleCategoryChange(e.target.checked, item._id)}>
            {item.name}
          </Checkbox>
        ))}


        <div>
          <h1>Filter By Price</h1>
          <Radio.Group onChange={(e) => handlePriceChange(e.target.value)}>
            {Prices.map((item) => (
              <div key={item._id}>
                <Radio checked={resetValue} value={item.array}>{item.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>

        <div className=''>
          <button onClick={resetFilter}> Reset Filter  </button>
        </div>

      </div>

      {/* Right side: Display Products */}
      <div id="right-side" className="min-h-screen w-full p-6 flex flex-col gap-6 items-center border-2 border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4"> All Products</h1>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full h-full"> */}

        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {allProduct.map((item, i) => (


            // <Card key={i} style={{ width: '18rem' }}>

            //   <Card.Img variant="top"
            //     src={`/api/v1/auth/product/Photo-Product/${item._id}`}
            //     onError={(e) => e.target.src = '/fallback-image.jpg'}
            //     alt={item.name}
            //   />

            //   <Card.Body>

            //     <Card.Title>{item.name}</Card.Title>
            //     <Card.Text>
            //       {item.description.substring(0, 30)}....
            //     </Card.Text>
            //     <Card.Text>
            //       $ {item.price}
            //     </Card.Text>
            //     <Button variant="primary">Go somewhere</Button>

            //   </Card.Body>

            // </Card>

            // <CardComponent item={item}> </CardComponent>


            // <div key={i} className="bg-white p-2 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">

            //   <div className="w-full max-h-[170px] bg-gray-200">

            //     <img
            //       className="w-full h-full object-contain"
            //       src={`/api/v1/auth/product/Photo-Product/${item._id}`}
            //       alt={item.name}
            //       onError={(e) => e.target.src = '/fallback-image.jpg'}
            //     />

            //   </div>

            //   <div className="p-4">
            //     <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            //     <p className="text-sm font-light text-gray-600 mt-2">{item.description.substring(0, 30)}....</p>
            //     <hr />
            //     <h4 className="text-lg font-bold text-blue-500 mt-4">${item.price}</h4>
            //   </div>


            // </div> 

            // <div className="bg-white rounded-lg shadow-lg overflow-hidden p-1">
            //   <img src={`/api/v1/auth/product/Photo-Product/${item._id}`} alt="Product Image"
            //     className="w-full h-44 object-contain rounded-md border-2" />
            //   <div className="p-6">
            //     <h3 className="text-xl font-bold text-gray-800"> {item.name}</h3>
            //     <p className="text-gray-600 mt-2 text-sm "> {item.description.substring(0, 20)}... </p>
            //     <hr />
            //     <div className="flex justify-between items-center mt-4">
            //       <span className="text-lg font-semibold text-gray-900">${item.price}</span>
            //       <button className="bg-blue-500 text-white text-sm md:px-4 py-2 px-1  rounded hover:bg-blue-600"
            //         onClick={() => addtoCart(item)}
            //       >Add to Cart</button>

            //       <button className="bg-blue-500 text-white text-sm md:px-4 py-2 px-1  rounded hover:bg-blue-600"
            //         onClick={() => DetailsHandle(item)}
            //       > Details... </button>

            //     </div>
            //   </div>
            // </div>



            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`/api/v1/auth/product/Photo-Product/${item._id}`} />

              <Card.Body>
                <Card.Title> {item.name} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {item.description.substring(0, 20)} </Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fugiat eveniet, eius magnam animi id? Et in recusandae beatae quam.
                </Card.Text>

                <Card.Link onClick={() => DetailsHandle(item)}>
                  Details..
                </Card.Link>

                <Card.Link onClick={() => {
                  // setCart([...cart, item])
                  // toast.success("data set to cart")
                  addtoCart(item)
                }}>
                  add to cart
                </Card.Link>

              </Card.Body>
            </Card>




          ))}


        </div>
      </div>

    </div>
  );
};

export default Homepage;



