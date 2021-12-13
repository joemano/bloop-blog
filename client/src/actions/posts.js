import * as api from '../api';
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, LIKE, DELETE, COMMENT } from '../constants/actionTypes';

// Action Creators
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    const action = { type: FETCH_POST, payload: data };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    const action = { type: FETCH_ALL, payload: data };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    const action = { type: FETCH_BY_SEARCH, payload: data };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    const action = { type: CREATE, payload: data};

    // history object passed here so that we can redirect on post creation
    history.push(`/posts/${data._id}`);
    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePost = (id, history) => async (dispatch) => {
  try {
    await api.deletePost(id);

    history.push(`/`);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
}