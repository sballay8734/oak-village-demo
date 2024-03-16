import { Request, Response, NextFunction } from "express"
import { errorHandler } from "../utils/errorHandler"
import Employee from "../models/Employee"

export const authorizeRole = (authorizedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.employee

    if (!employeeId)
      return next(errorHandler(400, "Unauthorized", "requestResult"))

    try {
      const employee = await Employee.findById(employeeId)

      if (!employee)
        return next(errorHandler(400, "Employee not found", "requestResult"))

      console.log(
        "EMPLOYEE MATCHES ROLE?",
        authorizedRoles.includes(employee.role)
      )

      if (!authorizedRoles.includes(employee.role)) {
        return next(errorHandler(400, "Unauthorized Role", "requestResult"))
      }
      next()
    } catch (error) {
      next(errorHandler(500, "Could not authorize role.", "requestResult"))
    }
  }
}
