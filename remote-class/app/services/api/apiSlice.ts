import { ForgetPasswordPayload, LoginPayload, LoginResponse, ResetPasswordPayload, SignupPayload, SignupResponse, StudentLoginPayload, StudentLoginResponse } from "@/app/utils/models/api.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const remoteClassApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    endpoints:(builder) => ({
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (LoginPayload) => ({
              url: `/auth/login`,
              method: "POST",
              body: LoginPayload,
            }),
          }),
          logout: builder.mutation<void, void>({
            query: () => ({
              url: `/auth/logout`,
              method: "POST",
            }),
          }),
          forgotPassword: builder.mutation<void, ForgetPasswordPayload>({
            query: (ForgetPasswordPayload) => ({
              url: `/auth/forgot-password`,
              method: "POST",
              body: ForgetPasswordPayload,
            }),
          }),
          resetPassword: builder.mutation<void, ResetPasswordPayload>({
            query: ({ authToken, password }) => {
              return {
                url: `/auth/reset-password`,
                method: "POST",
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
                body: password,
              };
            },
          }),
          signup: builder.mutation<SignupResponse, SignupPayload>({
            query: (SignupPayload) => ({
              url: "/auth/signup",
              method: "POST",
              body: SignupPayload,
            }),
          }),
          studentLogin: builder.mutation<StudentLoginResponse, StudentLoginPayload>({
            query: (credentials) => ({
              url: "/auth/student-login",
              method: "POST",
              body: credentials,
            }),
          }),

    })
})

export const 
{useLoginMutation,
    useLogoutMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation ,
    useSignupMutation ,
  useStudentLoginMutation}
     = remoteClassApi