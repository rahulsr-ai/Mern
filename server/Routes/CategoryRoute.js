import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import { GetAllCategoryController, PostCategoryController, updateCategoryController } from "../Controllers/CatergoryCont.js"

const router=express.Router()


router.post("/create-catogory", isrequired, isAdmin, PostCategoryController)

router.get("/get-allCatogory", isrequired, isAdmin, GetAllCategoryController)




router.put("/update-category/:pid", isrequired, isAdmin, updateCategoryController )


export default router

