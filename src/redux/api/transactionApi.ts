import { getFromLocalStorage } from "../../helpers/utils/saveData";
import { baseApi } from "./baseApi";

const token = getFromLocalStorage("accessToken");
const headers = {
  Authorization: `${token}`,
};

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    gettransactionHistory: build.query({
      query: (query) => ({
        url: `transactions`,
        method: "GET",
        headers: headers,
        params: query,
      }),
    }),
    sendMoney: build.mutation({
      query: (data) => ({
        url: `transactions/send`,
        method: "POST",
        headers: headers,
        body: data,
      }),
    }),
    cashIn: build.mutation({
      query: (data) => ({
        url: `transactions/cash-in`,
        method: "POST",
        headers: headers,
        body: data,
      }),
    }),
    agentCashIn: build.mutation({
      query: (data) => ({
        url: `transactions/agent-cash-in`,
        method: "POST",
        headers: headers,
        body: data,
      }),
    }),
    cashOut: build.mutation({
      query: (data) => ({
        url: `transactions/cash-out`,
        method: "POST",
        headers: headers,
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
