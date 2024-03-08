import { Request, Response, NextFunction } from "express"
import { errorHandler } from "../utils/errorHandler"

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // NOTE: This is wrong. The role should not be available here. The ID should be used to fetch the user from the DB and THEN get the role from there. This is more secure as it would require someone to guess the ID of someone with the correct role. You could take this a step further by requiring a name match also.
    const userRole = req.employee.role

    if (userRole === requiredRole) {
      next()
    } else {
      return next(errorHandler(403, "Unauthorized"))
    }
  }
}
