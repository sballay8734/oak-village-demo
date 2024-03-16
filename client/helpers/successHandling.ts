import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"
import { Dispatch } from "@reduxjs/toolkit"

export function handleMutationSuccess(dispatch: Dispatch, message: string) {
  dispatch(setResponseMessage({ successResult: true, message: message }))
}

export function handleQuerySuccess(dispatch: Dispatch, message: string) {
  dispatch(setResponseMessage({ successResult: true, message: message }))
}
