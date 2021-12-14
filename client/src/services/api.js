import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// change this to wherever you end up deploying
// const baseUrl = 'https://localhost:5000';
const baseUrl = 'https://bloop-blog.herokuapp.com';

export const bloopApi = createApi({
  reducerPath: 'bloopApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const profile = localStorage.getItem('profile');
      if (profile) {
        headers.set('authorization', `Bearer ${JSON.parse(profile).token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    fetchPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
    }),
    fetchPostsBySearch: builder.query({
      query: (searchQuery) => `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    updatePost: builder.mutation({
      query: (id, updatedPost) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/likePost`,
        method: 'PATCH',
      }),
    }),
    comment: builder.mutation({
      query: (value, id) => ({
        url: `/posts/${id}/commentPost`,
        method: 'POST',
        body: { value },
      }),
    }),
    signup: builder.mutation({
      query: (formData) => ({
        url: '/users/signup',
        method: 'POST',
        body: formData,
      }),
    }),
    signin: builder.mutation({
      query: (formData) => ({
        url: '/users/signin',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useFetchPostQuery,
  useFetchPostsQuery,
  useFetchPostsBySearchQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useCommentMutation,
  useSigninMutation,
  useSignupMutation,
} = bloopApi;
