import { log } from "console"
import ProductModel from "../Models/ProductModel.js"
import fs from "fs"
import slugify from "slugify"
import { privateDecrypt } from "crypto"

// CREATING product in the database 
export const postProductController = async (req, res) => {

    try {
        const { quantity, name, categoryy, slug, price, description, shiping } = req.fields

        const { photo } = req.files

        console.log(req.fields);


        // console.log(photo.data);









        // switch (true) {
        //     case !name:
        //         return res.status(500).send({ error: "name is required" })


        //     case !description:
        //         return res.status(500).send({ error: "description is required" })


        //     case !price:
        //         return res.status(500).send({ error: "price is required" })


        //     case !categoryy:
        //         return res.status(500).send({ error: "category is required" })


        //     case !quantity:
        //         return res.status(500).send({ error: "quantity is required" })


        //     case !shiping:
        //         return res.status(500).send({ error: "shipping is required" })

        //     case photo.File && photo.File.size > 10000:
        //     case photo && photo.size > 1000000:
        //         return res.status(500).send({ error: "photo is required" })

        // }

        if (photo) {
            photo.data = fs.readFileSync(photo.path)
            photo.contentType = photo.path; // type 
        }

        const CreatedProduct = await ProductModel({ ...req.fields, ...req.files, slug: slugify(name) });
        await CreatedProduct.save();


        // console.log(products);
        console.log("new product created .....");



        return res.status(200).send({
            success: true,
            message: "products created successfully",
            CreatedProduct
        })


    }

    catch (error) {
        console.log("error in creating product");

        res.status(402).send({
            success: true,
            customMessage: "error while creating product",
            message: error.message,

        })
    }


}



// export const postProductController = async (req, res) => {
//     try {
//       const { name, description, shiping, quantity, price, categoryy } = req.body;

//       // Validate required fields
//       if (!name || !description || !price || !categoryy || !quantity) {
//         return res.status(400).send({ success: false, error: "All fields are required" });
//       }

//       // Create a new product document
//       const newProduct = new ProductModel({
//         name,
//         description,
//         shiping: shiping === "1", // Convert string to boolean
//         quantity,
//         price,
//         category: categoryy,
//         slug: slugify(name),
//       });

//       // Check if photo file is attached
//       if (req.file) {
//         const photoPath = req.file.path;
//         newProduct.photo = {
//           data: fs.readFileSync(photoPath),
//           contentType: req.file.mimetype,
//         };
//         fs.unlinkSync(photoPath); // Remove temporary file
//       }

//       // Save the product
//       await newProduct.save();

//       res.status(200).send({
//         success: true,
//         message: "Product created successfully",
//         product: newProduct,
//       });
//     } catch (error) {
//       console.error("Error while creating product:", error.message);
//       res.status(500).send({
//         success: false,
//         message: "Server error while creating product",
//         error: error.message,
//       });
//     }
//   };


/// Get Product Controller 








export async function GetProductController(req, res) {

    try {
        const Products = await ProductModel.find({}).populate("categoryy").select("-photo").limit(12).sort({
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

        console.log(req.params.slug);

        const Product = await ProductModel.findById(req.params.slug).select("-Photo").populate("categoryy")
        // console.log(Product);
        
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

        console.log(req.params.pid);

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
        const { quantity, name, categoryy, slug, price, description, shipping } = req.fields

        const { photo } = req.files
        console.log("photo is ", photo);

        console.log(req.fields);





        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" })


            case !description:
                return res.status(500).send({ error: "description is required" })


            case !price:
                return res.status(500).send({ error: "price is required" })


            case !categoryy:
                return res.status(500).send({ error: "category is required" })


            case !quantity:
                return res.status(500).send({ error: "quantity is required" })



            case !shipping:
                return res.status(500).send({ error: "shipping is required" })

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




// filter Products by category 
export const filterProductByCategory = async (req, res) => {
    try {

        const { categories, priceRange } = req.body;

        console.log(categories);
        console.log(priceRange);

        let args = {

        }


        if (categories.length > 0) args.categoryy = categories;
        if (priceRange.length > 0) args.price = { $gte: priceRange[0], $lte: priceRange[1] };

        const filteredProducts = await ProductModel.find(args);

        console.log('product found');
        console.log(filteredProducts);



        res.status(200).send({
            success: true,
            message: "successfully fetched data",
            filteredProducts
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while filtering products by category",
            error: error.message
        });
    }
};



export const searchProduct = async (req, res) => {

    try {

        const { keyword } = req.params
        const products = await ProductModel.find({
            $or: [{ name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
            ],

        }).select("-photo")

        res.json(products)


    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            custom: "error while fecthing the searched product "
        })

    }

}



