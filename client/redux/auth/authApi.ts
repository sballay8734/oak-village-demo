// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { IEmployee_From, ILoginInfo, IRegisterInfo } from "./types"

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // First is what we get back, second is what we send
    lazyStandardSignIn: builder.mutation<IEmployee_From, ILoginInfo>({
      query: (formData) => ({
        url: "/auth/signin",
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
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
