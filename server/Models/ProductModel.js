import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true

    },
    slug: {
        type: String,
        lowerCase: true,
    },
    description: {
        type: String,
        require: true,

    }, price: {
        type: Number,
        require: true
    },
    categoryy: {
        type: mongoose.ObjectId,
        ref: "Categories",
        require: true,

    },
    quantity: {
        type: Number,
        require: true,

    }, photo: {
        data: Buffer,
        contentType: String,

    }, shipping: {
        type: String,
        default: "0"
    }
}, { timestamps: true })



const ProductModel = mongoose.model("Product", ProductSchema)
export default ProductModel