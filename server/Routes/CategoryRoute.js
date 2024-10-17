import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import { PostCategoryController } from "../Controllers/CatergoryCont.js"

const router=express.Router()


router.post("/create-catogory",isrequired, isAdmin, PostCategoryController)


export default router

