// TODO: Add authorizeRole("employee") back to middleware

import express from "express"
import { authorizeRole } from "../middleware/authorizeRole"
import { createWorkOrder } from "../controllers/maintenanceController"
import { authenticateUser } from "../middleware/authenticateUser"

const router = express.Router()

router.post("/create-work-order", createWorkOrder)

export default router