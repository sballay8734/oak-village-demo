import { NextFunction, Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"

import { errorHandler } from "../utils/errorHandler"
import Employee from "../models/Employee"

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SECRET_KEY: Secret = process.env.JWT_SECRET!

  try {
    // check for token
    const token = req.cookies.access_token

    if (!token) return next(errorHandler(401, "Unauthorized"))
    // verify user using jwt
    const decoded = jwt.verify(token, SECRET_KEY) as { _id: string }

    const employee = await Employee.findById(decoded._id)

    if (!employee) return next(errorHandler(401, "Unauthorized"))

    req.employee = employee.toObject()
    next()
  } catch (error) {
    next(error)
  }
}
