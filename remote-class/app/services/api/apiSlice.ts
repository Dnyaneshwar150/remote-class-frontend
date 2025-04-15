import {
  AddResourcePayload,
  ClassesListResponse,
  CreateClassPayload,
  CreateStudentPayload,
  CreateStudentResponse,
  ForgetPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
  SignupPayload,
  SignupResponse,
  StudentDashboardResponse,
  StudentLoginPayload,
  StudentLoginResponse,
  TeacherAssignmentsResponse,
  TeacherDashboardResponse,
  TeacherResourcesResponse,
  UploadAssignmentPayload,
} from "@/app/utils/models/api.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const remoteClassApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["TeacherDashboard"], // Define the tag type
  endpoints: (builder) => ({
    //Tearcher Signup login forgot passwords and logout
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (LoginPayload) => ({
        url: `/teacher/login`,
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
        url: "/teacher/signup",
        method: "POST",
        body: SignupPayload,
      }),
    }),

    //Student Login
    studentLogin: builder.mutation<StudentLoginResponse, StudentLoginPayload>({
      query: (credentials) => ({
        url: "/student/login",
        method: "POST",
        body: credentials,
      }),
    }),

    createStudent: builder.mutation<
      CreateStudentResponse,
      CreateStudentPayload
    >({
      query: (data) => ({
        url: "/student/create",
        method: "POST",
        body: data,
      }),
    }),

    //teacher resources assignments and classes
    getTeacherResources: builder.query<TeacherResourcesResponse, void>({
      query: () => ({
        url: "/resources",
        method: "GET",
      }),
      providesTags: ["TeacherDashboard"],
    }),
    //uplaod assingment
    addResource: builder.mutation<void, AddResourcePayload>({
      query: ({ title, year, file, subject }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("year", year);
        formData.append("subject", subject);
        formData.append("file", file);

        return {
          url: "/resources",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["TeacherDashboard"], // Invalidate on success
    }),

    // getAssignmentList
    getTeacherAssignment: builder.query<TeacherAssignmentsResponse, void>({
      query: () => ({
        url: "/assignment/teacher",
        method: "GET",
      }),
    }),

    //upload assignment
    uploadAssignment: builder.mutation<void, UploadAssignmentPayload>({
      query: ({ file, title, description, deadline, year, division }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("deadline", deadline);
        formData.append("year", year);
        formData.append("division", division);

        return {
          url: "/assignment",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["TeacherDashboard"], // Invalidate on success
    }),
    //clasess list api
    getClasses: builder.query<ClassesListResponse, void>({
      query: () => ({
        url: "/class/list",
        method: "GET",
      }),
    }),
    //create clases
    createClass: builder.mutation<void, CreateClassPayload>({
      query: (data) => ({
        url: "/class/create",
        method: "POST",
        body: data, // The payload to be sent in the body of the POST request
      }),
      invalidatesTags: ["TeacherDashboard"], // Invalidate on success
    }),
    //dashboard
    getTeacherDashboard: builder.query<TeacherDashboardResponse, void>({
      query: () => ({
        url: "/dashboard/teacher",
        method: "GET",
      }),
    }),
    getStudentDashboard: builder.query<StudentDashboardResponse, void>({
      query: () => ({
        url: "dashboard/student",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useSignupMutation,
  useStudentLoginMutation,
  useCreateStudentMutation,
  useGetTeacherDashboardQuery,
  useGetClassesQuery,
  useGetTeacherResourcesQuery,
  useAddResourceMutation,
  useUploadAssignmentMutation,
  useGetTeacherAssignmentQuery,
  useGetStudentDashboardQuery,
  useCreateClassMutation,
} = remoteClassApi;
