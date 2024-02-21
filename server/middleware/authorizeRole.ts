import { Request, Response, NextFunction } from "express"
import { errorHandler } from "../utils/errorHandler"

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.employee.role

    if (userRole === requiredRole) {
      next()
    } else {
      return next(errorHandler(403, "Unauthorized"))
    }
  }
}
