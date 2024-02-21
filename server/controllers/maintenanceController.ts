import { NextFunction, Response, Request } from "express"

export const createWorkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json("ROUTE FOUND!!")
}
