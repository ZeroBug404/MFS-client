import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: `users/manage`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getBalance: build.query({
      query: (query) => ({
        url: `users/balance`,
        method: "GET",
        params: query,
      }),
    }),
    approveAgent: build.mutation({
      query: (agentId) => ({
        url: `users/admin/agents/${agentId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    blockUser: build.mutation({
      query: (userId) => ({
        url: `users/admin/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    transactionHistory: build.query({
      query: () => ({
        url: `transactions/admin/transactions`,
        method: "GET",
      }),
    }),
    getMyProfile: build.query({
      query: () => ({
        url: `users/profile/me`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: `users/profile/me`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users", "Profile"],
    }),
    changePin: build.mutation({
      query: (data) => ({
        url: `users/profile/change-pin`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetAllUserQuery,
  useApproveAgentMutation,
  useBlockUserMutation,
  useTransactionHistoryQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangePinMutation,
} = userApi;
