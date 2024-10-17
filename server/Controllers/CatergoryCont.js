import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";


export async function PostCategoryController(req,res) {
    try {
        const {name} = req.body
        if (!name) { 
        return   res.status(401).send({
            success:false,
            message:"name is requireds"
           })
            
        }
        
        const existingCatergory = await CategoryModel.findOne({name})
        if(existingCatergory){ 
            return res.status(202).send({
                success: true,
                message: "category already exist"
            })
        } 

        const category = await new CategoryModel({name, slug: slugify(name)}).save();

        
           return res.status(201).send({ 
                success: true,
                message: "new category created successfully",
                category
            })
      
        




    } catch (error) {
        console.log(error);
        res.send({ 
            success: false,
            message:"error in categorycontroller",
            error: error.message
        })
        
    }
}