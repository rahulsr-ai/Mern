import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import { deleteCategoryController, fetchedSingleCategory, filterProductByCategory, GetAllCategoryController, PostCategoryController, updateCategoryController } from "../Controllers/CatergoryCont.js"

const router = express.Router()


router.post("/create-catogory", isrequired, isAdmin, PostCategoryController)

router.get("/get-allCategory", isAdmin, GetAllCategoryController)

// router.get("/get-single-category/:id", isAdmin, isrequired, fetchedSingleCategory)

// router.get("/product-byCategory", isrequired, filterProductByCategory)

router.put("/update-category/:pid", isrequired, isAdmin, updateCategoryController)
router.delete("/delete-category/:pid", isrequired, isAdmin, deleteCategoryController)


export default router

