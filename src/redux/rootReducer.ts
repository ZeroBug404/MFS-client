import { baseApi } from "./api/baseApi";


export const reducer = {
    // user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};