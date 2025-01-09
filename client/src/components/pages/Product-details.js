import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DetailedCard from '../Tailwind-Components/DetailedCard';
import { useCart } from '../../context/AddToCardContext';
import { progress } from 'framer-motion';


import { toast } from 'react-hot-toast';

const Productdetails = () => {

    const [cart, setCart] = useCart()





    const [ProductDetails, setProductDetails] = useState({})

    const location = useLocation()
    console.log(location.state._id);




    const getProductdata = async () => {


        try {
            const { data } = await axios.get(`/api/v1/auth/product/get-product/${location.state._id}`)

            // console.log(data.Product);

            setProductDetails(data.Product);


            // setTimeout(() => {
            //     console.log(ProductDetails);

            // }, 2000)



        } catch (error) {
            console.log("error while fetching single product");
            console.log(error);

        }
    }




    // function which perform add to cart functionality 
    const addToCartfunction = () => {

        //    console.log();
           
        setCart([...cart, ProductDetails ])

        toast.success("data set to cart ")



    }






    useEffect(() => {
        getProductdata()

    }, [])

    let name = 'something'
    console.log(name.charAt(0).toLocaleLowerCase());





    return (
        // <div className='min-h-screen w-full p-2'>

        //     <div className="bg-[wheat] flex flex-col md:flex-row py-4 px-10 shadow-lg rounded-lg">

        //         {/* Image Section */}
        //         <div className="flex justify-center items-center mb-4 md:mb-0 md:w-1/2 h-full">
        //             <img
        //                 src={`/api/v1/auth/product/Photo-Product/${ProductDetails._id}`}
        //                 alt={ProductDetails.name || "Product Image"}
        //                 className="object-contain border-2 border-black w-full h-full md:h-auto rounded-lg"
        //             />
        //         </div>


        //         <div className="w-full md:w-1/2 h-full border-2 border-red-500">


        //             <div className='p-2  flex-flex-col items-center '>

        //                 <h1> {ProductDetails.name} </h1>
        //                 <p> description : {ProductDetails.description}</p>
        //                 <p> Price : $ {ProductDetails.price} </p>
        //                 <span> Available {ProductDetails.quantity} </span>

        //                 <button className='block text-sm mt-4 p-2 rounded bg-blue-500'
        //                     onClick={() => addToCartfunction(ProductDetails)}
        //                 > Add To Cart </button>
        //             </div>



        //         </div>

        //     </div>






        // </div> 


        <div className="bg-white w-screen max-w-screen h-auto overflow-hidden">
            <div className="pt-2">

                <div className="mx-auto border-2 border-red-500 mt-2 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-2 lg:px-8">
                    {/* Image Section */}
                    <div className="lg:col-span-1 w-full border-2 border-green-500 relative h-0 pb-[100%]">
                        <img
                            src={`/api/v1/auth/product/Photo-Product/${ProductDetails._id}`}
                            alt={ProductDetails.name || "Product Image"}
                            className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="border-2 border-blue-500  mt-6 lg:col-span-1 lg:mt-0 flex flex-col justify-between">
                        {/* Title and Price */}
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{ProductDetails.name}</h1>
                        <p className="text-3xl tracking-tight text-gray-900">${ProductDetails.price}</p>

                        <div className="mt-0 border-2 border-black">
                            <h3 className="text-sm font-medium text-gray-900"> Description </h3>
                            <p className="mt-4 text-base text-gray-900">{ProductDetails.description}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Stock Information</h3>
                            <p className="text-base text-gray-900">Available: {ProductDetails.quantity}</p>
                        </div>


                        {/* Product Description */}


                        {/* Add to Cart Button */}
                        <button
                            onClick={addToCartfunction}
                            className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>

                        {/* Stock Information */}

                        {/* Highlights */}


                        {/* Product Details */}

                    </div>
                </div>
            </div>
        </div>






        // <DetailedCard/>

    )
}

export default Productdetails