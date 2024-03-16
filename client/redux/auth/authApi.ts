// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MutationCacheLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions"

// TODO: ILoginInfo needs to replace "string". "string" is just for testing
import { IEmployee_From, IRegisterInfo } from "./types"
import { setEmployee } from "./employeeSlice"
import {
  ApiResponse,
  AuthenticatedUser,
  ModApiResponse
} from "@/types/responsesFromServer"

export interface SignInFormData {
  email: string
  password: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/auth" }),
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    lazyStandardSignIn: builder.mutation<
      ModApiResponse<AuthenticatedUser>,
      SignInFormData
    >({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body
      })
    }),
    lazyStandardRegister: builder.mutation<IEmployee_From, IRegisterInfo>({
      query: (formData) => ({
        url: "/auth/register",
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
export const {
  useLazyStandardSignInMutation,
  useLazyStandardRegisterMutation
} = authApi
