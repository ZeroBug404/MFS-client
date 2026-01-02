import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    gettransactionHistory: build.query({
      query: (query) => ({
        url: `transactions`,
        method: "GET",
        params: query,
      }),
    }),
    sendMoney: build.mutation({
      query: (data) => ({
        url: `transactions/send`,
        method: "POST",
        body: data,
      }),
    }),
    cashIn: build.mutation({
      query: (data) => ({
        url: `transactions/cash-in`,
        method: "POST",
        body: data,
      }),
    }),
    agentCashIn: build.mutation({
      query: (data) => ({
        url: `transactions/agent-cash-in`,
        method: "POST",
        body: data,
      }),
    }),
    cashOut: build.mutation({
      query: (data) => ({
        url: `transactions/cash-out`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGettransactionHistoryQuery,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
  useAgentCashInMutation,
} = transactionApi;
