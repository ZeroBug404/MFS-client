import { baseApi } from "./baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `auth/login`,
        method: "POST",
        body: loginData,
      }),
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `auth/register`,
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;