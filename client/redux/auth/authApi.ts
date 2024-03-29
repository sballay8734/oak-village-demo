// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MutationCacheLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions"

// TODO: ILoginInfo needs to replace "string". "string" is just for testing
import { IEmployee_From, IRegisterInfo } from "./types"
import { setEmployee } from "./employeeSlice"
import { handleQuerySuccess } from "@/helpers/successHandling"
import { handleQueryErrors } from "@/helpers/errorHandling"
import {
  LAPTOP_HOME_IP,
  LAPTOP_CRANFIELD_IP,
  DESKTOP_IP,
  LAPTOP_OAK_VILLAGE_IP
} from "@/constants/ipConfig"

export interface SignInFormData {
  email: string
  password: string
}

interface SignedInUser {
  message: string
  payload: {
    _id: string
    email: string
    firstName: string
    lastName: string
    preferredName: string
    roleId: string
    classroom: string
  }
  success: true
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${LAPTOP_OAK_VILLAGE_IP}:3001/api/auth`
  }),
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    signIn: builder.mutation<SignedInUser, SignInFormData>({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          handleQuerySuccess(dispatch, "You are logged in!")
        } catch (err) {
          handleQueryErrors(err, dispatch)
        }
      }
    }),
    signup: builder.mutation<IEmployee_From, IRegisterInfo>({
      query: (formData) => ({
        url: "/auth/signup",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInMutation, useSignupMutation } = authApi
