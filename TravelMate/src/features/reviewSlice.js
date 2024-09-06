import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  review: [],
  loading: false,
  error: "",
};

export const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.review = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.review = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.review = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = reviewSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const { data } = await axios.get("http://localhost:3000/review", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    dispatch(fetchSuccess(data.reviewed)); // Pastikan hanya array `reviewed` yang disimpan
  } catch (error) {
    dispatch(fetchReject(error.message));
  }
};

// Secara otomatis dari slice yang dibuat juga menyediakan reducernya.
export default reviewSlice.reducer;
