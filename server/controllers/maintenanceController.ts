import { NextFunction, Response, Request } from "express"
import { MongooseError } from "mongoose"

import WorkOrder from "../models/WorkOrder"
import { errorHandler } from "../utils/errorHandler"
import { fieldsAreNotValid } from "../helpers/authHelpers"
import { successHandler } from "../utils/successHandler"
import { WorkOrderCreateResponse } from "../types/responsesToClient"
import Employee from "../models/Employee"

export const createWorkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroom, areaInClassroom, taskNeeded, additionalDetails } = req.body
  console.log(req.body)

  const employeeId = req.employee
  if (!employeeId)
    return next(
      errorHandler(401, "You must be logged in to do that!", "requestResult")
    )
  const employee = await Employee.findById(employeeId)
  if (!employee)
    return next(
      errorHandler(401, "You must be logged in to do that!", "requestResult")
    )

  // handling taskNeeded here because of RHF limitations
  if (!req.body.taskNeeded.trim()) {
    return next(errorHandler(400, "Please describe the task.", "formInput"))
  }
  if (req.body.taskNeeded.trim().length < 10) {
    return next(
      errorHandler(400, "Please include more information.", "formInput")
    )
  }

  if (fieldsAreNotValid(classroom, areaInClassroom, taskNeeded)) {
    return next(
      errorHandler(400, "Please fill out required fields.", "requestResult")
    )
  }

  try {
    const newWorkOrder = await WorkOrder.create({
      classroom,
      areaInClassroom,
      taskNeeded,
      additionalDetails: additionalDetails || "",
      employeeName: employee.firstName,
      employeeId
    })

    if (!newWorkOrder)
      return next(
        errorHandler(500, "Could not create work order", "requestResult")
      )

    // * need to cast created _id to string
    const reformattedWorkOrder: WorkOrderCreateResponse = {
      _id: newWorkOrder._id.toString(),
      classroom: newWorkOrder.classroom,
      areaInClassroom: newWorkOrder.areaInClassroom,
      taskNeeded: newWorkOrder.taskNeeded,
      additionalDetails: newWorkOrder.additionalDetails || "",
      employeeName: newWorkOrder.employeeName,
      employeeId: newWorkOrder.employeeId,
      status: newWorkOrder.status,
      dateSubmitted: newWorkOrder.dateSubmitted,
      seenByMaintenance: newWorkOrder.seenByMaintenance
    }

    return successHandler<WorkOrderCreateResponse>(
      res,
      200,
      "Work order created successfully",
      reformattedWorkOrder
    )
  } catch (error) {
    if (
      (error as MongooseError).name === "ValidationError" ||
      (error as MongooseError).name === "MongoError"
    ) {
      next(errorHandler(400, "Work order creation failed", "requestResult"))
    }
    next(error)
  }
}

export const getAllWorkOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeId = req.employee
  if (!employeeId)
    return next(
      errorHandler(400, "You must be logged in to do that!", "requestResult")
    )

  const workOrders = await WorkOrder.find()

  if (workOrders.length === 0) {
    return res.status(200).json(workOrders)
  }

  return res.status(200).json(workOrders)
  // TODO: Only get the work orders that are not completed maybe?
}

export const getWorkOrdersOfEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Getting SOME work orders.")
  const employeeId = req.employee
  if (!employeeId)
    return next(
      errorHandler(400, "You must be logged in to do that!", "requestResult")
    )

  const workOrders = await WorkOrder.find({ employeeId: employeeId })

  if (workOrders.length === 0) {
    return res.status(200).json(workOrders)
  }

  return res.status(200).json(workOrders)
  // TODO: Only get the work orders that are not completed maybe?
}

export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { workOrderId, status } = req.body
  const employeeId = req.employee

  if (!employeeId)
    return next(
      errorHandler(400, "You must be logged in to do that!", "requestResult")
    )

  if (!workOrderId || !status)
    return next(errorHandler(400, "Bad Request", "requestResult"))

  try {
    const workOrderToUpdate = await WorkOrder.findByIdAndUpdate(workOrderId, {
      status: status
    })

    if (!workOrderToUpdate)
      return next(
        errorHandler(500, "Failed to update status.", "requestResult")
      )

    console.log("SUCCESSFULLY UPDATED STATUS")
    return successHandler(
      res,
      200,
      "Status updated successfully!",
      workOrderToUpdate
    )
  } catch (error) {
    next(errorHandler(500, "Something went wrong.", "requestResult"))
  }
}

export const updateSeen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("HIT UPDATE SEEN")
  const { workOrderId } = req.body
  const employeeId = req.employee

  if (!employeeId)
    return next(
      errorHandler(400, "You must be logged in to do that!", "requestResult")
    )

  if (!workOrderId)
    return next(errorHandler(400, "Bad Request", "requestResult"))

  try {
    const workOrderToUpdate = await WorkOrder.findByIdAndUpdate(workOrderId, {
      seenByMaintenance: true
    })

    if (!workOrderToUpdate)
      return next(
        errorHandler(500, "Failed to update seen status.", "requestResult")
      )
    return successHandler(
      res,
      200,
      "Seen status updated successfully!",
      workOrderToUpdate
    )
  } catch (error) {
    next(errorHandler(500, "Something went wrong.", "requestResult"))
  }
}
