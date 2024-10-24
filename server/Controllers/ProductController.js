import { log } from "console"
import ProductModel from "../Models/ProductModel.js"
import fs from "fs"
import slugify from "slugify"

// CREATING product in the database 
export async function postProductController(req, res) {

    try {
        const { quantity, name, category, slug, price, description, shipping } = req.fields

        const { photo } = req.files
        console.log(photo);






        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" })


            case !description:
                return res.status(500).send({ error: "description is required" })


            case !price:
                return res.status(500).send({ error: "price is required" })


            case !category:
                return res.status(500).send({ error: "category is required" })


            case !quantity:
                return res.status(500).send({ error: "quantity is required" })



            // case !shipping:
            //     return res.status(500).send({ error: "shipping is required" })

            // case photo.File && photo.File.size > 10000:
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required" })

        }



        const products = new ProductModel({ ...req.fields, slug: slugify(name), });


        console.log(products);
        console.log("new product created .....");


        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.path; // type 
        }

        await products.save();

        return res.status(200).send({
            success: true,
            message: "products created successfully",
            products
        })


    }

    catch (error) {
        console.log("error in creating product");

        res.status(402).send({
            success: true,
            message: error.message,

        })
    }


}



/// Get Product Controller 

export async function GetProductController(req, res) {

    try {
        const Products = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({
            createdAt: -1
        });

        return res.status(200).send({
            success: true,
            counTotal: Products.length,
            message: "all products",
            Products
        })



    } catch (error) {
        console.log('error in get product route');
        res.status(500).send({
            success: false,
            error: error.message
        })


    }

}



// GETTING single Product

export async function GetSingleProductController(req, res) {
    try {

        const Product = await ProductModel.findOne({ slug: req.params.slug }).select("-Photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'single product fetched',
            Product
        })




    } catch (error) {
        console.log('error in get single product route');
        res.status(500).send({
            success: false,
            error: error.message
        })


    }

}


// controller to get photo
// export const ProductPhotoController = async (req, res) => {
//     try {
//         const product = await ProductModel.findById(req.params.pid).select("photo");

//         if (!product) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         if (product.photo && product.photo.data) {
//             res.set("Content-Type", product.photo.contentType);
//             return res.status(200).send(product.photo.data);
//         } else {
//             return res.status(404).send({
//                 success: false,
//                 message: "No photo available for this product"
//             });
//         }
//     } catch (error) {
//         console.error("Error in photoController:", error); // Log the error for debugging
//         res.status(500).send({
//             success: false,
//             message: "Error getting photo in photoController",
//             error: error.message
//         });
//     }
// };





// Fetching single product PHOTO 
export const ProductPhotoController = async (req, res) => {
    try {

        const product = await ProductModel.findById(req.params.pid).select("photo")

        console.log(product);



        if (product.photo.data) {
            res.set("ContentType", product.photo.path)
            return res.status(200).send(product.photo.data)
        }




    } catch (error) {
        res.status(500).send({
            success: false,
            message: "getting error in photoController ",
            error: error.message
        })

    }
}



// UPDATING product data 
export async function UpdateProductData(req, res) {

    try {
        const { quantity, name, category, slug, price, description, shipping } = req.fields

        const { photo } = req.files
        console.log(photo);






        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" })


            case !description:
                return res.status(500).send({ error: "description is required" })


            case !price:
                return res.status(500).send({ error: "price is required" })


            case !category:
                return res.status(500).send({ error: "category is required" })


            case !quantity:
                return res.status(500).send({ error: "quantity is required" })



            // case !shipping:
            //     return res.status(500).send({ error: "shipping is required" })

            // case photo.File && photo.File.size > 10000:
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required" })

        }



        const products = await ProductModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields,
            slug: slugify(name)
        }, { new: true });





        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type; // type 
        }

        await products.save();

        return res.status(201).send({
            success: true,
            message: "products updated successfully",
            products
        })


    }

    catch (error) {
        console.log("error in updating product");

        res.status(502).send({
            success: true,
            message: error.message,

        })
    }


}





// Deleting route for product 
export const ProductDeleteController = async (req, res) => {
    try {

        await ProductModel.findByIdAndDelete(req.params.pid).select("photo")
        res.status(200).send({
            success: true,
            message: "product deleted successfullly"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "successfully delete the route",
            error: error.message
        })
    }
}
