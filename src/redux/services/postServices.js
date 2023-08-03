import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { TOKEN } from "../../const/const";

const token = Cookies.get(TOKEN);

const PostServices = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-backend-production-a0a8.up.railway.app/api/v1/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({search,limit,page}) => ({
        url:`post?search=${search}&limit=${limit}&page=${page}`,
      }),
      providesTags: ["Post"],
    }),
    getPost: builder.mutation({
      query: (id) => `post/${id}`,
    }),
    addNewPostImg: builder.mutation({
      query: (body) => ({
        url: "upload",
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    editPost: builder.mutation({
      query: ({ body, id }) => ({
        url: `post/${id}`,
        method: "PUT",
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useAddNewPostImgMutation,
  useEditPostMutation,
  useGetPostMutation,
} = PostServices;

export default PostServices;
