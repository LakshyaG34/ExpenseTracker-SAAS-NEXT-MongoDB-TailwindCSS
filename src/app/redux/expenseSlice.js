"use client"

import { createSlice } from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name : "expenses",
    initialState : {
        list : []
    },
    reducers:{
        setExpenses(state, action){
            state.list = action.payload;
        }
    }
})

export const {setExpenses} = expenseSlice.actions;
export default expenseSlice.reducer;