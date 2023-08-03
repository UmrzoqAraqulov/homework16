import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { TOKEN } from "../../const/const";

const token = Cookies.get(TOKEN);

const categoryServices = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-backend-production-a0a8.up.railway.app/api/v1/",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({page,limit}) => `category?limit=${limit}&page=${page}`,
      providesTags: ["Category"],
    }),
    getCategory: builder.mutation({
      query: (id) => `category/${id}`,
    }),
    addNewCategoryImg: builder.mutation({
      query: (body) => ({
        url: "upload",
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({body,id}) => ({
        url: `category/${id}`,
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useDeleteCategoryMutation,useAddNewCategoryImgMutation,useAddCategoryMutation,useEditCategoryMutation,useGetCategoryMutation } =
  categoryServices;

export default categoryServices;
