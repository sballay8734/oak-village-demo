import express from "express"
import {
  signup,
  signin,
  signout,
  dummysignin
} from "../controllers/authController"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/dummysignin", dummysignin)
router.get("/signout", signout)

export default router
