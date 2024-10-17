import express from "express"
import { isAdmin, isrequired } from "../middleware/authMiddleware.js"
import formidable from "express-formidable"
import { GetProductController, GetSingleProductController, postProductController } from "../Controllers/ProductController.js"

const router = express.Router()

router.post("/create-product", isrequired, isAdmin, formidable(), postProductController)
router.get("/get-product", GetProductController)
router.get("/get-product/:slug", GetSingleProductController )



export default router


