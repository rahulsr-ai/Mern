import { log } from "console"
import ProductModel from "../Models/ProductModel.js"
import fs from "fs"
import slugify from "slugify"

// creating product in the database 
export async function postProductController(req, res) {

    try {
        const { quantity, name, category, slug, price, description, shipping } = req.fields

        const { photo } = req.files





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

            case photo.File && photo.File.size > 10000:
                return res.status(500).send({ error: "photo is required" })

        }



        const products = new ProductModel({ ...req.fields, slug: slugify(name), });




        if (photo) {
            products.photo.data == fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }

        await products.save();

        return res.status(201).send({
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

// Get single Product

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





