import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { whitelistedEmails } from "../utils/tempEmailWhitelist"
import { errorHandler } from "../utils/errorHandler"
import Employee from "../models/Employee"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, preferredName } = req.body

  if (!whitelistedEmails.includes(email))
    return next(errorHandler(403, "Unauthorized: Email is not whitelisted."))

  if (!email || !password || !firstName || !lastName || !preferredName) {
    return next(errorHandler(400, "Invalid Request: All fields required."))
  }

  const hashedPassword = bcrypt.hashSync(password, 14)

  // TODO: Add name formatting and validation here

  try {
    const newEmployee = await Employee.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      preferredName
    })

    const newEmployeeObject = newEmployee.toObject()
    const { password, ...rest } = newEmployeeObject

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

// TODO: Still need to test signin route
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password: signInPassword } = req.body

  try {
    const validEmployee = await Employee.findOne({ email })
    if (!validEmployee) return next(errorHandler(400, "Employee not found."))

    const validPassword = bcrypt.compareSync(
      signInPassword,
      validEmployee.password
    )
    if (!validPassword) return next(errorHandler(401, "Invalid credentials."))

    const token = jwt.sign({ _id: validEmployee._id }, process.env.JWT_SECRET!)

    const employeeObject = validEmployee.toObject()
    const { password, ...rest } = employeeObject

    res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest)
  } catch (error) {
    next(error)
  }
}

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Hit sign IN route")
}

export const dummysignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  try {
    console.log(`Logged in as ${req.body.formData}`)
    return res.status(201).json({
      employeeName: "Shawn Ballay",
      employeeId: "Dlkjf9834fasdlk489",
      employeeClassroom: "Infants 1"
    })
  } catch (error) {
    next(error)
  }
}
