import { NextFunction, Request, Response } from "express"
import jwt, { Secret, VerifyErrors } from "jsonwebtoken"

import { errorHandler } from "../utils/errorHandler"
import Employee from "../models/Employee"

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token

    if (!token) return next(errorHandler(401, "Unauthorized", "requestResult"))

    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: VerifyErrors | null, employee: any) => {
        if (err) return next(errorHandler(403, "Forbidden", "requestResult"))

        console.log("AUTHENTICATED")
        req.employee = employee._id
        next()
      }
    )
  } catch (error) {
    next(error)
  }
}
