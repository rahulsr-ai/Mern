import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import { GetAllCategoryController, PostCategoryController } from "../Controllers/CatergoryCont.js"

const router=express.Router()


router.post("/create-catogory", isrequired, isAdmin, PostCategoryController)

router.get("/get-allCatogory", isrequired, isAdmin, GetAllCategoryController)


export default router

