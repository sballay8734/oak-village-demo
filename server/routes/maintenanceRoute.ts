// TODO: Add authorizeRole("employee") back to middleware

import express from "express"
import { authorizeRole } from "../middleware/authorizeRole"
import {
  createWorkOrder,
  getWorkOrdersOfEmployee
} from "../controllers/maintenanceController"
import { authenticateUser } from "../middleware/authenticateUser"
import { getAllWorkOrders } from "../controllers/maintenanceController"

const router = express.Router()

router.post(
  "/create-work-order",
  authenticateUser,
  authorizeRole(["admin", "teacher"]),
  createWorkOrder
)
router.get(
  "/maintenance-work-orders",
  authenticateUser,
  authorizeRole(["maintenance"]),
  getAllWorkOrders
)
router.get(
  "/employee-work-orders",
  authenticateUser,
  authorizeRole(["admin", "teacher"]),
  getWorkOrdersOfEmployee
)

export default router
