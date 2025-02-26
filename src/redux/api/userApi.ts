import { getFromLocalStorage } from "../../helpers/utils/saveData";
import { baseApi } from "./baseApi";

const token = getFromLocalStorage("accessToken");
const headers = {
  Authorization: `${token}`,
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createLesson: build.mutation({
    //   query: (lessonData) => ({
    //     url: `lessons/create`,
    //     method: 'POST',
    //     body: lessonData,
    //     headers: headers,
    //   }),
    // }),
    getAllUser: build.query({
      query: () => ({
        url: `users/manage`,
        method: "GET",
        // headers: headers,
      }),
    }),
    getBalance: build.query({
      query: (query) => ({
        url: `users/balance`,
        method: "GET",
        headers: headers,
        params: query,
      }),
    }),
    approveAgent: build.mutation({
      query: (agentId) => ({
        url: `users/admin/agents/${agentId}/approve`,
        method: "PATCH",
        headers: headers,
      }),
    }),
    blockUser: build.mutation({
      query: (userId) => ({
        url: `users/admin/${userId}/block`,
        method: "PATCH",
        headers: headers,
      }),
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetAllUserQuery,
  useApproveAgentMutation,
  useBlockUserMutation,
} = userApi;
