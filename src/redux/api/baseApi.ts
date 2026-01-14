import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../../helpers/utils/saveData";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5001/api/v1",
    // baseUrl: "https://mfs-server-eosin.vercel.app/api/v1",
    baseUrl: "https://mfs-server-zsrv.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage("accessToken");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "Profile"],
  endpoints: () => ({}),
});
