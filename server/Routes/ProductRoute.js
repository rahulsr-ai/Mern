import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import formidable from "express-formidable"
import { GetProductController, GetSingleProductController, postProductController, ProductDeleteController, ProductPhotoController, UpdateProductData } from "../Controllers/ProductController.js"

const router = express.Router()

router.post("/create-product", isrequired, isAdmin, formidable(), postProductController)


router.get("/get-product", GetProductController)


router.get("/get-product/:slug", GetSingleProductController)

router.get("/Photo-Product/:pid", ProductPhotoController)

router.delete("/delete-product/:pid", ProductDeleteController)

router.post("/update-product/:pid", formidable(), UpdateProductData)


export default router


