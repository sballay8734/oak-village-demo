import express from "express"
import { authorizeRole } from "../middleware/authorizeRole"
import { createWorkOrder } from "../controllers/maintenanceController"
import { authenticateUser } from "../middleware/authenticateUser"

const router = express.Router()

router.post("/work-order", authorizeRole("employee"), createWorkOrder)

export default router
