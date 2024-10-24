import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";


export async function PostCategoryController(req, res) {
    try {
        const { name } = req.body
        // console.log('in the post category controller ');

        if (!name) {
            return res.status(401).send({
                success: true,
                message: "name is required"
            })

        }

        const existingCatergory = await CategoryModel.findOne({ name })
        if (existingCatergory) {
            return res.status(202).send({
                success: true,
                message: "category already exist"
            })
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save();


        return res.status(201).send({
            success: true,
            message: "new category created successfully",
            category
        })






    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error in categorycontroller",
            error: error.message
        })

    }
}





export const GetAllCategoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({})

        if (!category) {
            return res.status(401).send({
                success: true,
                message: "categories not exits"
            })
        }

        return (
            res.status(200).send({
                success: true,
                message: "successfully fetched all catergory data",
                category
            })
        )

    } catch (error) {
        console.log("error while getting all categories");
        res.send(401).send({
            success: false,
            message: error.message
        })

    }
}