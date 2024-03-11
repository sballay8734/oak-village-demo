import { NextFunction, Response, Request } from "express"
import WorkOrder, { IWorkOrder_To } from "../models/WorkOrder"
import { MongooseError } from "mongoose"
import { errorHandler } from "../utils/errorHandler"

export const createWorkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: IWorkOrder_To = req.body

  try {
    // create new workorder
    const newWorkOrder = await WorkOrder.create(data)
    return res.status(201).json(newWorkOrder)
  } catch (error) {
    if (
      (error as MongooseError).name === "ValidationError" ||
      (error as MongooseError).name === "MongoError"
    ) {
      next(errorHandler(400, "Work order creation failed"))
    }
    next(error)
  }
}
