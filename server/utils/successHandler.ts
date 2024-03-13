import { Response } from "express"

interface ErrorResponse {
  success: boolean
  statusCode: number
  message: string
}

interface SuccessResponse<T> {
  success: boolean
  statusCode: number
  message: string
  payload: T
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>

export function successHandler<T>(
  res: Response,
  statusCode: number,
  message: string,
  payload: T
) {
  if (message.length > 50) {
    console.error(`SUCCESS MSG IS TOO LONG! MSG = ${message}`)
  }
  return res.status(statusCode).json({ success: true, message, payload })
}

// 200 - OK
// 201 - Created
// more info on 200 codes - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses
