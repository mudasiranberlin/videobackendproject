import { Router } from "express";
import {loginUser, logoutUser, registerUser,refreshAccessToken, changeCurrentPassword, getCurrentUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

    router.route("/login").post(loginUser)
    router.route("/logout").post(verfiyJWT,logoutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/change-password").post(verfiyJWT,changeCurrentPassword)
    router.route("/current-user").post(verfiyJWT,getCurrentUser)
    router.route

export default router
