import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  searchQuery: "",
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectNews = (state) => state.news.news;

export const { setNews, setSearchQuery } = newsSlice.actions;

export default newsSlice.reducer;
