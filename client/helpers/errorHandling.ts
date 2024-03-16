import { Dispatch } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"

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

export function handleMutationErrors(err: unknown, dispatch: Dispatch) {
  if (isApiErrorResponse(err)) {
    console.log("TRUE!!")
    dispatch(
      setResponseMessage({
        successResult: false,
        message: err.error.data.message
      })
    )
  } else if (isFetchBaseQueryError(err)) {
    const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
    dispatch(
      setResponseMessage({
        successResult: false,
        message: errMsg
      })
    )
  } else if (isErrorWithMessage(err)) {
    const errMsg = err.message
    dispatch(
      setResponseMessage({
        successResult: false,
        message: errMsg
      })
    )
  } else {
    console.log("FROM API", err)
    dispatch(
      setResponseMessage({
        successResult: false,
        message: "Something went very VERY wrong."
      })
    )
  }
}

export function handleQueryErrors(err: unknown, dispatch: Dispatch) {
  if (isApiErrorResponse(err)) {
    console.log("TRUE!!")
    dispatch(
      setResponseMessage({
        successResult: false,
        message: err.error.data.message
      })
    )
  } else if (isFetchBaseQueryError(err)) {
    const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
    dispatch(
      setResponseMessage({
        successResult: false,
        message: errMsg
      })
    )
  } else if (isErrorWithMessage(err)) {
    const errMsg = err.message
    dispatch(
      setResponseMessage({
        successResult: false,
        message: errMsg
      })
    )
  } else {
    console.log("FROM API", err)
    dispatch(
      setResponseMessage({
        successResult: false,
        message: "Something went very VERY wrong."
      })
    )
  }
}
