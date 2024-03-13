import { Err } from "../types/error"

export const errorHandler = (
  statusCode: number,
  message: string,
  type: "formInput" | "requestResult"
): Err => {
  const error = new Error(message) as Err

  if (message.length > 50) {
    console.error(`ERR MSG IS TOO LONG! MSG = ${message}`)
  }

  error.statusCode = statusCode
  error.message = message
  error.type = type

  return error
}
