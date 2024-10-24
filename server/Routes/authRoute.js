import express from 'express'
import { authLogin, forgetPassword, registerController, usertest } from '../Controllers/authController.js';
import { isrequired, isAdmin } from '../middleware/authMiddleware.js';
//router object
const router = express.Router()

router.post("/register", registerController)
router.post("/login", authLogin)
router.get("/test", isrequired, isAdmin, usertest)
router.post("/forgetPassword", forgetPassword)


router.get("/user-auth", isrequired, (req, res) => {
    res.status(200).send({ ok: true })
})
router.get("/admin-auth", isrequired, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;









