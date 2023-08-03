import { configureStore } from "@reduxjs/toolkit";
import categoryServices from "../services/categoryServices";
import PostServices from "../services/postServices";

export const store = configureStore({
  reducer: {
    [categoryServices.reducerPath]: categoryServices.reducer,
    [PostServices.reducerPath]: PostServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(categoryServices.middleware).concat(PostServices.middleware)
  }
});
