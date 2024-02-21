import Employee from "../../models/Employee"

declare module "express-serve-static-core" {
  interface Request {
    employee?: Employee
  }
}
