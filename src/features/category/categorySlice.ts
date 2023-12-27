import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async (arg: {difficulty: string, categoryId: string | undefined}) => {
        try {
            console.log(arg);
            const response = await axios.request({
                method: 'get',
                url: 'https://opentdb.com/api_config.php',
                params: {
                    amount: arg.categoryId,
                    difficulty: arg.difficulty
                }
            })
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch category");
        }
    }
);

interface initialStateType {
    question: string
    options: string[]
    difficulty: string
    id: string
    loading: boolean
    error: string | null
}

const initialState: initialStateType = {
    question: "",
    options: [],
    difficulty: "easy",
    id: "",
    loading: false,
    error: null
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.id = action.payload
        },
        setCategoryDifficulty(state, action){
            state.difficulty = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = true
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.loading = true
            });
    },
});

export const { setCategoryId, setCategoryDifficulty } = categorySlice.actions
export default categorySlice.reducer;
