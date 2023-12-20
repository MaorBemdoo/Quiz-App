import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch todos
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php") // Assuming a function to fetch todos from an API
    return response.data; // Return the data received from the API
  } catch (error) {
    // Handle error scenarios
    throw new Error("Failed to fetch todos");
  }
});

interface initialStateType{
  categories: {id: number, name: string}[]
  loading: boolean
  error: null | string
}

const initialState: initialStateType = {
  categories: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Other synchronous reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.trivia_categories;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.categories = "error"
        })
  },
});

export default categoriesSlice.reducer;
