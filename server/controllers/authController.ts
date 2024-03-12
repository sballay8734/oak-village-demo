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
    return next(
      errorHandler(
        403,
        "Unauthorized: Email is not whitelisted.",
        "requestResult"
      )
    )

  if (!email || !password || !firstName || !lastName || !preferredName) {
    return next(
      errorHandler(
        400,
        "Invalid Request: All fields required.",
        "requestResult"
      )
    )
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
// TODO: REMEMBER, DON'T SEND ROLE BACK TO FRONT END
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password: signInPassword } = req.body

  try {
    const validEmployee = await Employee.findOne({ email })
    if (!validEmployee)
      return next(errorHandler(400, "Employee not found.", "requestResult"))

    const validPassword = bcrypt.compareSync(
      signInPassword,
      validEmployee.password
    )
    if (!validPassword)
      return next(errorHandler(401, "Invalid credentials.", "requestResult"))

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
  console.log("Hit sign OUT route")
}

// TODO: REMEMBER, DON'T SEND ROLE BACK TO FRONT END
// FIND ANOTHER WAY TO INSTRUCT THE FRONT-END WHAT TO RENDER
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
      employeeClassroom: "Infants 1",
      // TODO: Temporary. Correct files should be served from backend.
      role: req.body.formData
    })
  } catch (error) {
    next(error)
  }
}
