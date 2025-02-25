import { baseApi } from "./api/baseApi";


export const reducer = {
  //   category: courseReducer,
  //   trees: treeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};