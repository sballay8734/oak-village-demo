// TODO FOR TUESDAY
// TODO: Might need to change work-order-modal to standard, custom modal
// TODO: clean up error handling (fail renders red, success renders green)
// TODO: set up api to handle errors and use a global error handler
// TODO: You should have ErrorModal AND NativeModalError MAYBE (see FIXME)
// TODO: ErrorModal - for errors that DON'T happen in displayed modals
// TODO: NativeModalError - for errors that happen in Native Modals
// FIXME: It would be nice if you could just have one ErrorHandler for both and you might be able to if you change the work-order modal to a custom one. This would allow you to both handle the errors using a single method AND re-use the modal across all Stacks (Bascially you should have one ErrorModal and on ConfirmModal)

import { NextFunction, Response, Request } from "express"
import WorkOrder, { IWorkOrder_To } from "../models/WorkOrder"
import { MongooseError } from "mongoose"
import { errorHandler } from "../utils/errorHandler"

export const createWorkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Requests should automatically return a success or fail and render the correct styling on the front end accordingly
  const data: IWorkOrder_To = req.body
  const employee = req.employee
  // handling taskNeeded here because of RHF limitations
  if (!req.body.taskNeeded)
    return next(errorHandler(400, "Please describe the task."))

  if (!employee)
    return next(errorHandler(401, "You must be logged in to do that!"))

  try {
    // create new workorder
    // return next(errorHandler(401, "Not an authorized user"))
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
