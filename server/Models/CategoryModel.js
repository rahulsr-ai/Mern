import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({ 
    name: { 
        type: String,
        require: true,
        trim: true
    },
    slug: { 
        type: String,
        lowerCase: true,
    }
})

export default mongoose.model("Categories", CategorySchema)