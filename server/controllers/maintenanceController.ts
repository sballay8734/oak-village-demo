// TODO FOR TUESDAY
// TODO: clean up error handling (fail renders red, success renders green)
// TODO: set up api to handle errors and use a global error handler
// FIXME: Change work-order-form to be a new screen that renders from the right when clicking on "create work order". The default work-order screen should show all work orders with the ability to filter by status, active, etc. and at the top right should be a button that says "create work order" (or something like that). NATIVE modals should ONLY be used for displaying information. They should NOT be able to trigger things that might cause errors.
// TODO: Maybe modify your responses on the server to send a "type" parameter. BECAUSE you might need to use a different dispatch depending on the error/success type and where you want to display the resulting message/response (middle modal, under form input, top of screen, etc). Example types: "formInput" (for handling limitations of RHF), "reqResult" (for rendering at top of screen)

// formInput - for rendering under form inputs
// reqResult - for rendering at top of screen

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
