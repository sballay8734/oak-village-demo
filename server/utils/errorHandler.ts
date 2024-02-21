import { Err } from "../types/error"

export const errorHandler = (statusCode: number, message: string): Err => {
  const error = new Error(message) as Err

  error.statusCode = statusCode
  error.message = message

  return error
}
