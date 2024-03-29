import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { whitelistedEmails } from "../utils/tempEmailWhitelist"
import { errorHandler } from "../utils/errorHandler"
import Employee from "../models/Employee"
import { successHandler } from "../utils/successHandler"
import { roleIsValid } from "../helpers/authHelpers"

// ! Realistically, employees will NOT sign up. Their account will be created by an admin and they will simply login with the supplied details and change their password
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

  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUNDS!)
  )
  try {
    const newEmployee = await Employee.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      preferredName
    })

    const newEmployeeObject = newEmployee.toObject()
    const { password, role, ...rest } = newEmployeeObject

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
  console.log("HIT LOGIN")
  const { email, password } = req.body

  try {
    const validUser = await Employee.findOne({ email })
    if (!validUser)
      return next(
        errorHandler(400, "Email or password is incorrect", "requestResult")
      )

    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword)
      return next(
        errorHandler(400, "Email or password is incorrect", "requestResult")
      )

    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET!)

    const userObject = validUser.toObject()

    // TODO: Validate that role matches role.id
    if (!roleIsValid(userObject.roleId, userObject.role)) {
      return next(
        errorHandler(
          400,
          "Weird. The role doesn't match the role id.",
          "requestResult"
        )
      )
    }

    const { password: pass, role, ...rest } = userObject

    res.cookie("access_token", token, { httpOnly: true })
    return successHandler(res, 200, "Sign in successful!", rest)
  } catch (error) {
    next(errorHandler(500, "Could not signin.", "requestResult"))
  }
}

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token")
    return successHandler(res, 200, "User has been logged out!", {})
  } catch (error) {
    next(errorHandler(500, "Failed to sign out user.", "requestResult"))
  }
}
