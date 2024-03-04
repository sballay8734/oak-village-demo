// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MutationCacheLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions"

// TODO: ILoginInfo needs to replace "string". "string" is just for testing
import { IEmployee_From, ILoginInfo, IRegisterInfo } from "./types"
import { setEmployee } from "./employeeSlice"

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/auth" }),
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    lazyStandardSignIn: builder.mutation<IEmployee_From, string>({
      query: (formData) => ({
        // TODO: Change this back to "signin"
        url: "/dummysignin",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formData })
      }),
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        // TODO: dispatch start message
        try {
          const { data } = await queryFulfilled
          dispatch(setEmployee(data))
        } catch (error) {
          // TODO: dispatch error
        }
      }
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
