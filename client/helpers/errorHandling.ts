import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface ApiErrorResponse {
  error: {
    data: {
      message: string
      statusCode: number
      success: false
      type: "formInput" | "requestResult"
    }
    status: number
  }
}

export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  console.log("CHECKING IF API ERROR")
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as any).error === "object" &&
    "data" in (error as any).error &&
    "message" in (error as any).error.data
  )
}
/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  )
}
