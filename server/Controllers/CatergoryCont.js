import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";
import ProductModel from "../Models/ProductModel.js";


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


// updating Category controller
export const updateCategoryController = async (req, res) => {



    try {
        const { name } = req.body


        console.log(req.params.pid);
        console.log(`name is ${name}`);

        const data = await CategoryModel.findByIdAndUpdate(req.params.pid, { name, slug: slugify(name) }, { new: true });

        return res.status(200).send({
            success: true,
            message: "categpry updated successfully",
            data
        })


    }
    catch (error) {
        console.log("error while updating categories");
        res.send(400).send({
            success: false,
            message: error.message
        })

    }
}


export const deleteCategoryController = async (req, res) => {
    try {
        console.log(req.params.pid);

        await CategoryModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success: true,
            message: "category deleted successfullly"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while deleting the category",
            error: error.message
        })
    }
}



// GET SINGLE CATEGORY CONTROLLER 
export const fetchedSingleCategory = async (req, res) => {
    try {

        const category = await CategoryModel.findById(req.params.id)


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while fetching the category",
            error: error.message
        })

    }
}




// filter Products by category 
export const filterProductByCategory = async (req, res) => {
    try {
      // For GET requests, access data from req.query, not req.body
      const { checked, radio } = await req.query;

    //   const data = await ProductModel.find
  
      console.log("backend Processing");
      console.log(checked);  // Should show the value sent in the GET request
      console.log(radio);   // Should show the value sent in the GET request
      
      res.json({ message: "Data received", checked, radio: radio });
  
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while filtering products by category",
        error: error.message
      });
    }
  };
  