import express from "express"

import { authorizeRole } from "../middleware/authorizeRole"
import { authenticateUser } from "../middleware/authenticateUser"

import {
  createWorkOrder,
  getWorkOrdersOfEmployee,
  getAllWorkOrders,
  updateStatus,
  updateSeen
} from "../controllers/maintenanceController"

const router = express.Router()

// * Create a new workorder
router.post(
  "/create-work-order",
  authenticateUser,
  authorizeRole(["admin", "teacher"]),
  createWorkOrder
)
// * Fetch all work orders for maintenance
router.get(
  "/maintenance-work-orders",
  authenticateUser,
  authorizeRole(["maintenance"]),
  getAllWorkOrders
)
// * Update the status of a work order (maintenance only)
router.put(
  "/maintenance-work-orders/update-status",
  authenticateUser,
  authorizeRole(["maintenance"]),
  updateStatus
)
// * Update the "seen" status of a work order (maintenance only)
router.put(
  "/maintenance-work-orders/update-seen",
  authenticateUser,
  authorizeRole(["maintenance"]),
  updateSeen
)
// * Fetch work orders that match employee Id
router.get(
  "/employee-work-orders",
  authenticateUser,
  authorizeRole(["admin", "teacher"]),
  getWorkOrdersOfEmployee
)

export default router
