import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.rou

export default router


import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router()
router.route("/register").post

